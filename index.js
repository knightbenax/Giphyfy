//Initialize all the things
var delay;
var image_results = [];
const api_key = '3QIjIWWudRjqoTj65jOD3lThIpTA9Sx2';
const url = 'https://api.giphy.com/v1/gifs/search?api_key=' + api_key + '&';

//for snoppy brethrens
function postJobs(){
  console.log("You like to see how things work ehn? Why not come join us at Field Intelligence? https://www.fieldintelligence.org/work-with-us");
}

//this is to delay the fetch a bit a few seconds after the user finishes typing
function makeDelay(ms) {
    var timer = 0;
    return function(callback){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
};

function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
  return parent.appendChild(el); // Append the second parameter(element) to the first one
}

function removeNodes(element){
  var myNode = document.getElementById(element);
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }
}

function displayResults() {
  var image_results_holder = document.getElementById('image_results');
  removeNodes('image_results');
  //we want to remove previous results before we display the new one
  //alert(image_results.length);

  for (var i = 0; i < image_results.length; i++){
    var image_url = image_results[i]['images']['original']['url'];
    var title = image_results[i]['title'];

    var image_holder = createNode('div');
    image_holder.className = 'image_results__holder';

    var button = createNode('a');
    button.className = 'image_results__download';
    button.setAttribute('href', image_url);
    button.setAttribute('download', title + '.gif');
    button.setAttribute('target', '_blank');
    button.setAttribute('title', 'Download');
    button.innerHTML = 'Download';

    var image = createNode('div');
    image.className = 'image_results__single';



    image.style.backgroundImage = 'url(' + image_url + ')';

    append(image_holder, image);
    append(image_holder, button);

    append(image_results_holder, image_holder);
  }

  NProgress.done();
}

function fetchResult(){
  NProgress.start();
  //the user's request
  var search = document.getElementById('search_input').value;

  //ping Giphy's API
  fetch( url + 'q=' + search + '&limit=20')
    .then((resp) => resp.json())
    .then(function (result) {
      console.log(result);
      image_results = result.data;
      console.log(image_results);

      displayResults();
  }, function (error){
    NProgress.done();
    //we would of course change this alert to a nice looking alert dialog
    alert("Something went wrong. Issue has been logged and ninja monkeys dispatched. Please try again")
    //console.log('An error occurred: ' + error);
  })
}

document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
        // Initialize your application or run some code.
        postJobs();
        //Initialize the callback
        delay = makeDelay(250);
    }
}
