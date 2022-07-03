const sliderLength = parseInt(document.getElementById("slider").max);
let songPlaying = false;
let songIndex = 0;
let songNames = ['../songs/You Make Me.mp3', '../songs/04 Addicted To You.mp3', '../songs/Afrojack x Jewelz & Sparks feat. Emmalyn - Switch.mp3'];
let audioObjects = [];

setup();

function setup(){
  // Load songs and create Audio objects
  for(let i = 0; i < songNames.length; i++){
    audioObjects.push(new Audio(songNames[i]));
  }

  // Set song title in UI to first song in playlist
  document.getElementById("songTitle").textContent = songNames[songIndex];

  // Give buttons functionality
  document.getElementById("prevImg").onclick = function(){changeSong("prev");};
  document.getElementById("nextImg").onclick = function(){changeSong("next");};
  document.getElementById("playPauseImg").onclick = function(){playPause();};

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
}

// Pauses or plays current song
function playPause(){
  // Pause current song
  if(songPlaying){
    audioObjects[songIndex].pause();
    songPlaying = !songPlaying;
    document.getElementById("playPauseImg").src = "../images/play.png";
  }

  // Play current song
  else{
      audioObjects[songIndex].play();
      songPlaying = !songPlaying;
      document.getElementById("playPauseImg").src = "../images/pause.png";
  }
}

// Changes song
function changeSong(direction){
  audioObjects[songIndex].pause();

  // change song index depending if moving forwards or backwards
  if(direction == "prev"){
    songIndex = (songIndex + audioObjects.length - 1 ) % audioObjects.length;
  }
  else if(direction == "next"){
    songIndex = (songIndex + 1 ) % audioObjects.length;
  }

  // play the new song
  audioObjects[songIndex].currentTime = 0;
  document.getElementById("songTitle").textContent = songNames[songIndex];
  if(songPlaying){
    audioObjects[songIndex].play();
  }
}
