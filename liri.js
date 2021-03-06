// read and set any environment variables with the dotenv package
require("dotenv").config();

// import keys.js file
var keys = require("./keys.js");

// Include the axios npm package
var axios = require('./axios.js');

// Include moment package
var moment = require("moment");

// Include spotify.js file
var spotify = require("./spotify.js");

// Include Node fs package
var fs = require("fs");



// reading the arguments list 
var args = process.argv;

// reading the user command
var userCommand = args[2];

var request = "";
var runAxious = false;

// reading the user search request (song name , movie name , band name);
// %20 code for white space is assigned if user enters a name with spaces 
switch (userCommand){
    case "spotify-this-song":       
       spotify.searchSpotify(args,"S");
      break;

    case "concert-this":
    case "movie-this" :   
      request = args.slice(3,args.length).join("%20");

      axios.searchAxios(userCommand, request);
      break;
    
    case "do-what-it-says" :
        
        fs.readFile("./random.txt","utf8",function(err,data){
            
            if (err){
        
                return console.log(err);
            }
        
            var fileData = data.split(",");
        
            var spotifyRequest = fileData[1].replace(/"/g,"");
            console.log(spotifyRequest);
            var concertRequest = fileData[3].replace(/"/g,"").replace(/ /g,"%20");
            var movieRequest = fileData[5].replace(/"/g,"").replace(/ /g,"%20");

            // console.log("Featured Song");
            spotify.searchSpotify(spotifyRequest,"D");

            // console.log("Featured Movie");
            axios.searchAxios('movie-this',movieRequest);

            // console.log("Featured Band");            
            axios.searchAxios('concert-this',concertRequest);
            
        });
        break;

    default :
        console.log ("No such command");
        break;
} 

// variable to assign the url 



