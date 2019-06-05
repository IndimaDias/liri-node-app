// this file has functions for searching song information with "node-spotify-api"


// import keys.js file
var keys = require("./keys.js");

var fs = require("fs");

// Include node-spotify-api package
var Spotify = require("node-spotify-api");

// access API keys
var spotify = new Spotify(keys.spotify);

var queryVal = "";
var commandStr = "";
var devider = "\n******************Song Information********************\n";

module.exports = {searchSpotify};

function searchSpotify(searchVal, searchOption){
//    console.log(searchVal);

    
    if(searchOption === "S"){
        if (searchVal === "" || searchVal === null) {
            queryVal = "The Sign";
        }
        else{
            queryVal = searchVal.slice(3,searchVal.length).join(" ");
        }
        

    }
    else{
        queryVal = searchVal;
    }


    spotify
    .search({ type: 'track', query: queryVal },function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var songInfo = data.tracks.items[0];
        var txtString =[ "Artist :" + songInfo.artists[0].name,
                        "Song Name : " + songInfo.name ,
                        "Album Name : " + songInfo.album.name ,
                        "Preview Link : " + songInfo.preview_url,
                        "  " ].join("\n\n");

        if(searchOption === 'S'){
            commandStr = "spotify-this-song " + queryVal + "\n";
        }
        else{
            commandStr = "do-what-it-says\n" ;
        }
        

    //   console.log(songInfo); 
        console.log("\n");
        console.log(devider);
        console.log(txtString);

        fs.appendFile("log.txt","\n" + devider + commandStr + txtString, function(err){
            if(err){
                return console.log(err);
            }
        
        })                    
                     
    });
}