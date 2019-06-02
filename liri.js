// read and set any environment variables with the dotenv package
require("dotenv").config();

// import keys.js file
var keys = require("./keys.js");

// Include the axios npm package
var axios = require('axios');

var Spotify = require("node-spotify-api");

// access API keys
var spotify = new Spotify(keys.spotify);

// reading the arguments list 
var args = process.argv;

// reading the user command
var userCommand = args[2];

// reading the user search request (song name , movie name , band name);
var request = args[3];

// variable to assign the url 
var queryURL = "";

console.log(userCommand + " " + request);

switch(userCommand){
    case "concert-this":
        queryURL = "https://rest.bandsintown.com/artists/" + request + "/events?app_id=codingbootcamp";
        break;
    
    case "movie-this":
        queryURL =  "http://www.omdbapi.com/?t=" + request + "&y=&plot=short&apikey=trilogy";
        break;


}

// run axios request to the api 
axios.get(queryURL).then(
    function(response){
        console.log(response.data);
    }
).catch(function(error){
    error.message;
})