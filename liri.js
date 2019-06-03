// read and set any environment variables with the dotenv package
require("dotenv").config();

// import keys.js file
var keys = require("./keys.js");

// Include the axios npm package
var axios = require('axios');

// Include moment package
var moment = require("moment");

// Include node-spotify-api package
var Spotify = require("node-spotify-api");

// access API keys
var spotify = new Spotify(keys.spotify);

// reading the arguments list 
var args = process.argv;

// reading the user command
var userCommand = args[2];

// reading the user search request (song name , movie name , band name);
// %20 code for white space is assigned if user enters a name with spaces 
if (userCommand === "spotify-this-song"){

    var request = args.slice(3,args.length).join(" ");
}
else{
    var request = args.slice(3,args.length).join("%20");
}

// variable to assign the url 
var queryURL = "";

// console.log(userCommand + " " + request);

// validate user command and create url for the API
switch(userCommand){
    case "concert-this":
        queryURL = "https://rest.bandsintown.com/artists/" + request + "/events?app_id=codingbootcamp?limit=5";
        break;
    
    case "movie-this":
        // if user didn't enter a movie name
        if (request === "" || request === null) {
           
            request = "Mr.%20Nobody.";
            console.log("If you haven't watched ' Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");
            console.log("                                    ");
        }
        queryURL =  "http://www.omdbapi.com/?t=" + request + "&y=&plot=short&apikey=trilogy";
        
        break;

    case "spotify-this-song":
      if (request === "" || request === null) {
          request = "The Sign";
      }

      break;
}  


var queryResults = [];

if (userCommand === "spotify-this-song"){
  spotify
    .search({ type: 'track', query: request },function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var songInfo = data.tracks.items[0];
    //   console.log(songInfo); 
        console.log("Artist :" + songInfo.artists[0].name +
                    "\nSong Name : " + songInfo.name +
                    "\nAlbum Name : " + songInfo.album.name +
                    "\nPreview Link : " + songInfo.preview_url );
                     
    });
}
else{


// run axios request to the api 
    axios.get(queryURL).then(
        function(response){
        //    assign data to an array 
            queryResults = response.data;
            // console.log(queryResults);

            
            if(userCommand === 'movie-this'){
                // find Rotten tomatoes rating for the movie
                try{
                    // find object with source Rotten Tomatoes in the array of Ratings and get the rating value
                    var rating = queryResults.Ratings.find(ratingObj => ratingObj.Source === "Rotten Tomatoes").Value;          
                }catch(err){
                    // if the Rotten tomato rating is not defined 
                rating = "Rating not available";
                }
                            
                console.log("Title : " + queryResults.Title + 
                "\nYear : " + queryResults.Year +
                "\nIMDB Rating : " + queryResults.imdbRating +
                "\nRotten Tomatoes Ratin : " + rating +
                "\nCountry : " + queryResults.Country + 
                "\nLanguage : " + queryResults.Language +
                "\nPlot : " + queryResults.Plot +
                "\nActors : " + queryResults.Actors);

            }
            else if (userCommand === 'concert-this'){
                // read the array in a for loop and display results. 
                // moment package is used to format the event date
                for(var i =0; i,queryResults.length; i++){

                    console.log("Venue name : " + queryResults[i].venue.name + 
                    "\nVenue Location : " + queryResults[i].venue.city + " " + queryResults[i].venue.country +
                    "\nDate of the event : " + moment(queryResults[i].datetime).format("MM/DD/YYYY"));                
                }

                console.log("                                             ");
                console.log("****************************************************************");
                console.log("                                             ");

            }
        }
    ).catch(function(error){
        error.message;
    });
}
