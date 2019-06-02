// read and set any environment variables with the dotenv package
require("dotenv").config();

// import keys.js file
var keys = require("./keys.js");

// Include the axios npm package
var axios = require('axios');

// Include node-spotify-api package
var Spotify = require("node-spotify-api");

// Include moment package

var moment = require("moment");
// moment().format();

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
        queryURL = "https://rest.bandsintown.com/artists/" + request + "/events?app_id=codingbootcamp?limit=5";
        break;
    
    case "movie-this":
        queryURL =  "http://www.omdbapi.com/?t=" + request + "&y=&plot=short&apikey=trilogy";
        break;


}
var queryResults = [];
// run axios request to the api 
axios.get(queryURL).then(
    function(response){
    //    assign data to an array 
        queryResults = response.data;
        // console.log(queryResults);
        // read the array 
        for(var i =0; i,queryResults.length; i++){
            console.log("Venue name : " + queryResults[i].venue.name + 
                        "\nVenue Location : " + queryResults[i].venue.city + " " + queryResults[i].venue.country +
                        "\nDate of the event : " + moment(queryResults[i].datetime).format("MM/DD/YYYY"));
                        console.log("                                             ");
                        console.log("****************************************************************");
                        console.log("                                             ");
        }
    }
).catch(function(error){
    error.message;
})

