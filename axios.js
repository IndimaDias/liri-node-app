// this file has functions for searching  information with "axios" package

// Include the axios npm package
var axios = require('axios');

// Include moment package
var moment = require("moment");

var fs = require("fs");

var queryURL = "";

var queryResults = [];

var queryStr = "";

var devider = "";

module.exports = {searchAxios};


function searchAxios(userCommand, searchVal){

    // validate user command and create url for the API
    switch(userCommand){
        case "concert-this":
            queryURL = "https://rest.bandsintown.com/artists/" + searchVal + "/events?app_id=codingbootcamp?limit=5";
            break;
        
        case "movie-this":
            // if user didn't enter a movie name
            if (searchVal === "" || searchVal === null) {
               
                searchVal = "Mr.%20Nobody.";
                console.log("\n");
                console.log("If you haven't watched ' Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
                console.log("It's on Netflix!");
                console.log("                                    ");
            }
            queryURL =  "http://www.omdbapi.com/?t=" + searchVal + "&y=&plot=short&apikey=trilogy";
            
            break;
    } 

    // run axios request to the api 
    axios.get(queryURL).then(
        function(response){
        //    assign data to an array 
            queryResults = response.data;
           
            if(userCommand === 'movie-this'){
                // find Rotten tomatoes rating for the movie
                try{
                    // find object with source Rotten Tomatoes in the array of Ratings and get the rating value
                    var rating = queryResults.Ratings.find(ratingObj => ratingObj.Source === "Rotten Tomatoes").Value;          
                }catch(err){
                    // if the Rotten tomato rating is not defined 
                rating = "Rating not available";
                }
                devider = "******************Movie Information********************\n"
                console.log("\n");      

                console.log(devider);

                queryStr = ["Title : " + queryResults.Title ,
                "Year : " + queryResults.Year , 
                "IMDB Rating : " + queryResults.imdbRating ,
                "Rotten Tomatoes Ratin : " + rating ,
                "Country : " + queryResults.Country ,
                "Language : " + queryResults.Language ,
                "Plot : " + queryResults.Plot ,
                "Actors : " + queryResults.Actors ,
                "\n"].join("\n");

                console.log(queryStr);
                console.log("\n");

                logData(devider + userCommand + " " + searchVal + "\n", queryStr );
            }
            else if (userCommand === 'concert-this'){
                // read the array in a for loop and display results. 
                // moment package is used to format the event date
                console.log("\n");
                devider = "******************Band Information********************\n"
                console.log(devider);

                logData("\n" + devider + userCommand + " " + searchVal,"");

                for(var i =0; i,queryResults.length; i++){

                    
                    queryStr = ["Venue name : " + queryResults[i].venue.name ,
                    "Venue Location : " + queryResults[i].venue.city + " " + queryResults[i].venue.country ,
                    "Date of the event : " + moment(queryResults[i].datetime).format("MM/DD/YYYY"),
                    " ",
                    "**********************************************************",
                    "  "].join("\n");  
                    console.log(queryStr);              
                    logData("",queryStr);
                    
                }

                
            }
            
            
            // console.log(queryStr, 'outside')
            

        }
    ).catch(function(error){
        error.message;
    });

    function logData(SearchCommand, queryStr) {
        fs.appendFile("log.txt","\n" + SearchCommand + queryStr,function(err){
           
            if(err){
               return console.log(err);
            }
        })
    }
}