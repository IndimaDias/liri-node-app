# LIRI
LIRI - Language Interpretation and Recognition Interface, a command line node app that takes in parameters and give back data. The user has the option of specifying four commands with the specific parameters


## Problem
Developing an app to serach for songs, bands in town for concerts and movies. 
The search should provide following information to the user

Bands in town [Command - concert-this <artist/band name here>] 
* Name of the venue
* Venue location
* Date of the Event (use moment to format this as "MM/DD/YYYY")
 
Songs [Command - spotify-this-song '<song name here>']
* Artist(s)
* The song's name
* A preview link of the song from Spotify
* The album that the song is from

Movies [Command - movie-this '<movie name here>']
  * Title of the movie.
  * Year the movie came out.
  * IMDB Rating of the movie.
  * Rotten Tomatoes Rating of the movie.
  * Country where the movie was produced.
  * Language of the movie.
  * Plot of the movie.
  * Actors in the movie.

Do what it says [Command -  do-what-it-says]
  * Display information related to a featured band, song and a movie. 
  * The above parameters are saved in a text file.


## Instructions
  * Open a terminal such as Bash 
  * Navigate to the folder that contains liri.js  
  * Run command options above to retreive data.
  * For first three commnads user should specify a search parameter. 
  * Any other command enter will be notified as "No such command"
  * If a parameter is not entered for movie-this or spotify-this-song" a default parameter would be searched.

## Technologies 
  * JavaScript
  * Nodejs
  * Node Module packages
     - Node-Spotify-api
     - Axios 
     - Moment
     - DotEnv
     - Fs
  * APIs User 
     - Bands in Town
     - OMDB
  * Git
  * GitHub

 

   **Do what it says** 
   
   ![Do what it says](https://github.com/IndimaDias/liri-node-app/blob/master/concert-this.PNG)
   
   

   **Movie-this <movie>**
 
   ![Movie this](https://github.com/IndimaDias/liri-node-app/blob/master/movie-this.PNG)

   
   
   **Movie-this no parameter**
   
   ![Movie this no parameter](https://github.com/IndimaDias/liri-node-app/blob/master/movie-this-noParameter.PNG)
   
   

   **Concert-this <band>**
 
   ![Concert this](https://github.com/IndimaDias/liri-node-app/blob/master/concert-this.PNG)



   **Spotify-this-song <song>**

   ![Spotify this](https://github.com/IndimaDias/liri-node-app/blob/master/spotify-this.PNG)



   **Spitify-this-song no parameter**

   ![Spotify this no parameter](https://github.com/IndimaDias/liri-node-app/blob/master/spotify-this-noParameter.PNG)

   
   
   **Invalid command**
   
   ![Invalid Command](https://github.com/IndimaDias/liri-node-app/blob/master/NoCommand.PNG)



