// this file has functions for searching song information with "node-spotify-api"


// import keys.js file
var keys = require("./keys.js");

// Include node-spotify-api package
var Spotify = require("node-spotify-api");

// access API keys
var spotify = new Spotify(keys.spotify);

module.exports = {searchSpotify};

function searchSpotify(searchVal){
   

    if (searchVal === "" || searchVal === null) {
        searchVal = "The Sign";
    }
    

    spotify
    .search({ type: 'track', query: searchVal },function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var songInfo = data.tracks.items[0];
    //   console.log(songInfo); 
        console.log("\n");
        console.log("******************Song Information********************");
        console.log("Artist :" + songInfo.artists[0].name +
                    "\nSong Name : " + songInfo.name +
                    "\nAlbum Name : " + songInfo.album.name +
                    "\nPreview Link : " + songInfo.preview_url );
                     
    });
}