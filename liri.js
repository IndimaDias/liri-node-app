// read and set any environment variables with the dotenv package
require("dotenv").config();

// import keys.js file
var keys = require("./keys.js");

// Include the axios npm package
var axios = require('axios');

// access API keys
var spotify = new Spotify(keys.spotify);

// run axions request to the api 
axios.get("https://rest.bandsintown.com/artists/abc/events?app_id=codingbootcamp").then(
    function(response){
        console.log(response.data);
    }
).catch(function(error){
    error.message;
})