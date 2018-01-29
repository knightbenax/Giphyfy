//Initialize all the things
var delay;
var image_results = [];
const api_key = '3QIjIWWudRjqoTj65jOD3lThIpTA9Sx2';
const url = 'http://api.giphy.com/v1/gifs/search?api_key=' + api_key + '&';

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

function displayResults() {
  var image_results_holder = document.getElementById('image_results');

  //we want to remove previous results before we display the new one
  image_results_holder.clearChildren;

  //alert(image_results.length);

  for (var i = 0; i < image_results.length; i++){

    var image = createNode('div');
    image.className = 'image_results__single';

    var image_url = image_results[i]['images']['original']['url'];

    image.style.backgroundImage = 'url(' + image_url + ')';

    append(image_results_holder, image);
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
