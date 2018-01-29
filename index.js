//Initialize all the things
var delay;

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

function fetchResult(){
  //the user's request
  var search = document.getElementById('search_input').value;

  //ping Giphy's API
  fetch('http://api.giphy.com/v1/gifs/translate?api_key=3QIjIWWudRjqoTj65jOD3lThIpTA9Sx2&s=' + search).then(function (result) {
    console.log('Response from the endpoint ' + result);
  }, function (error){
    console.log('An error occurred: ' + error);
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
