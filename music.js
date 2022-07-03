const sliderLength = parseInt(document.getElementById("slider").max);
var songPlaying = false;
var songIndex = 0;
var songNames = ['You Make Me.mp3', '04 Addicted To You.mp3', 'Afrojack x Jewelz & Sparks feat. Emmalyn - Switch.mp3'];
var audioObjects = [];

// Load songs and create Audio objects
for(let i = 0; i < songNames.length; i++){
  audioObjects.push(new Audio(songNames[i]));
}

// Set song title in UI to first song in playlist
document.getElementById("songTitle").textContent = songNames[songIndex];

// Give buttons functionality
document.getElementById("prevImg").onclick = function(){prevSong();};
document.getElementById("nextImg").onclick = function(){nextSong();};
document.getElementById("playPauseImg").onclick = function(){playPause();};

// Pauses or plays current song
function playPause(){
  // Pause current song
  if(songPlaying){
    audioObjects[songIndex].pause();
    songPlaying = !songPlaying;
    document.getElementById("playPauseImg").src = "play.png";
  }

  // Play current song
  else{
      audioObjects[songIndex].play();
      songPlaying = !songPlaying;
      document.getElementById("playPauseImg").src = "pause.png";
  }
}

// Plays previous song
function prevSong(){
  audioObjects[songIndex].pause();
  songIndex = (songIndex + audioObjects.length - 1 ) % audioObjects.length;
  audioObjects[songIndex].currentTime = 0;
  document.getElementById("songTitle").textContent = songNames[songIndex];
  if(songPlaying){
    audioObjects[songIndex].play();
  }
}

// Plays next song
function nextSong(){
  audioObjects[songIndex].pause();
  songIndex = (songIndex + 1 ) % audioObjects.length;
  audioObjects[songIndex].currentTime = 0;
  document.getElementById("songTitle").textContent = songNames[songIndex];
  if(songPlaying){
    audioObjects[songIndex].play();
  }
}

// Listen for when the spacebar is pressed
document.body.onkeyup = function(e) {
  if (e.key == " " || e.code == "Space" || e.keyCode == 32){
    playPause();
  }
}

// Listen for if the user changes position of song
document.getElementById("slider").addEventListener("change", function(){
  audioObjects[songIndex].currentTime = audioObjects[songIndex].duration * parseFloat(document.getElementById("slider").value) / sliderLength;
});

// The loop that controls the progress slider and plays next song when completed
setInterval(function(){
  document.getElementById("slider").value =
  (sliderLength * audioObjects[songIndex].currentTime / audioObjects[songIndex].duration).toString();

  // Check if current song is completed
  if(audioObjects[songIndex].currentTime == audioObjects[songIndex].duration){
    nextSong();
  }
}, 1000);
