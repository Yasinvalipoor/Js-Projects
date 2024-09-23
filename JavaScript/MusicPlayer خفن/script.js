var $ = document;
// Buttons
const playPreviousBtn = _id("play-previous");
const play_PauseBtn = _id("play-pause-button");
const playNextBtn = _id("play-next");
// Buttons
const albumArt = _id("album-art");
const playerTrack = _id("player-track");
// Times
const currentTimeDisplay = _id("current-time");
const totalDurationDisplay = _id("track-length");
// SeekBar
var seekBar = _id("seek-bar");
var sArea = _id("s-area");
var insTime = _id("ins-time");
var sHover = _id("s-hover");
// Icons
const faPlay = $.querySelector(".fa-play");
const faPause = $.querySelector(".fa-pause");
const audioElement = $.querySelector("audio");
// Sources array
const musicSrc = [
    "DMT-Ashkan-Kagan.mp3",
    "Precious-Little-Hiatus.mp3",
    "Secret-Whispers-Behdad-Bahrami.mp3",
];
// Variable
var musicIndex = 0;
var duration = 0;



play_PauseBtn.addEventListener("click", function () {
    togglePlayPause();
});

playPreviousBtn.addEventListener("click", function () {
    musicIndex--;
    if (musicIndex < 0) { musicIndex = 2; } // Condition
    audioElement.setAttribute("src", `Audio/${musicSrc[musicIndex]}`);
    audioElement.play();
    if (faPause.classList.contains("hidden-display")) { togglePlayPause(); } // Condition
});

playNextBtn.addEventListener("click", function () {
    musicIndex++;
    if (musicIndex > musicSrc.length - 1) { musicIndex = 0; } // Condition
    audioElement.setAttribute("src", `Audio/${musicSrc[musicIndex]}`);
    audioElement.play();
    if (faPause.classList.contains("hidden-display")) { togglePlayPause(); } // Condition
});




audioElement.addEventListener("loadedmetadata", function() {
    duration = audioElement.duration;
    totalDurationDisplay.textContent = formatTime(audioElement.duration);
});

audioElement.addEventListener("timeupdate", function() {
    var currentTime = audioElement.currentTime;
    currentTimeDisplay.textContent = formatTime(audioElement.currentTime);
    var progress = (currentTime / duration) * 100;
    seekBar.style.width = progress + "%";    
    if (duration === currentTime) {
        currentTimeDisplay.textContent = '0:00';
        seekBar.style.width = 0 + "%";
        togglePlayPause();
    }
});


// Mouse movement event on the search bar to display the corresponding time
sArea.addEventListener("mousemove", function(event) {
    var sAreaWidth = sArea.offsetWidth;
    var offsetX = event.offsetX;
    var hoverTime = (offsetX / sAreaWidth) * duration;
    var formattedTime = formatTime(hoverTime);

    // insTime
    insTime.textContent = formattedTime;
    insTime.style.left = offsetX + "px";
    insTime.style.display = "block";
    insTime.style.marginLeft = "-21px";
    // sHover
    sHover.style.width = offsetX + "px";
    sHover.style.display = "block";
});

sArea.addEventListener("mouseleave", function() {
    sHover.style.display = "none";
    insTime.style.display = "none";
    insTime.style.left = "0px";
    insTime.style.marginLeft = "0px";
    insTime.textContent = '';
});


// Click event to set playback time
sArea.addEventListener("click", function(event) {
    var sAreaWidth = sArea.offsetWidth;
    var offsetX = event.offsetX;
    var clickTime = (offsetX / sAreaWidth) * duration;
    audioElement.currentTime = clickTime; // Setting the playback time to the click location
});

// Functions : 
function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var seconds = Math.floor(seconds % 60);
    if (seconds < 10) {seconds = "0" + seconds;}
    if (minutes < 10) {minutes = "0" + minutes;}
    return minutes + ":" + seconds;
}
function togglePlayPause() {
    faPlay.classList.toggle("hidden-display");
    faPause.classList.toggle("hidden-display");
    playerTrack.classList.toggle("active");
    albumArt.classList.toggle("active");
    faPlay.classList.contains("hidden-display") ? audioElement.play() : audioElement.pause(); // Condition
}
function _id(id_name) {return $.getElementById(id_name);}
function _class(class_name) {return $.getElementsByClassName(class_name);}