var $ = document;
function _id(id_name) {
    return $.getElementById(id_name);
}
function _class(class_name) {
    return $.getElementsByClassName(class_name);
}

const playPreviousBtn = _id("play-previous");
const play_PauseBtn = _id("play-pause-button");
const playNextBtn = _id("play-next");

const albumArt = _id("album-art");
const playerTrack = _id("player-track");

const currentTimeDisplay = _id("current-time");
const totalDurationDisplay = _id("track-length");



const faPlay = $.querySelector(".fa-play");
const faPause = $.querySelector(".fa-pause");
const audioElement = $.querySelector("audio");



const musicSrc = [
    "DMT-Ashkan-Kagan.mp3",
    "Precious-Little-Hiatus.mp3",
    "Secret-Whispers-Behdad-Bahrami.mp3",
];

musicIndex = 0;

function togglePlayPause() {
    faPlay.classList.toggle("hidden-display");
    faPause.classList.toggle("hidden-display");

    playerTrack.classList.toggle("active");
    albumArt.classList.toggle("active");

    faPlay.classList.contains("hidden-display") ? audioElement.play() : audioElement.pause(); // Condition

}

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



// audioElement.addEventListener("loadedmetadata", function () {
//     var totalDuration = formatTime(audioElement.duration);
//     totalDurationDisplay.textContent = totalDuration;
// });

// audioElement.addEventListener("timeupdate", function () {
//     var currentTime = formatTime(audioElement.currentTime);
//     currentTimeDisplay.textContent = currentTime;
// });

// function formatTime(seconds) {
//     var minutes = Math.floor(seconds / 60);
//     var seconds = Math.floor(seconds % 60);
//     if (seconds < 10) { seconds = "0" + seconds; } // Condition
//     return minutes + ":" + seconds;
// }


var seekBar = document.getElementById("seek-bar");
var sArea = document.getElementById("s-area");
var insTime = document.getElementById("ins-time");
var sHover = document.getElementById("s-hover");
var duration = 0; // مدت زمان کل آهنگ

audioElement.addEventListener("loadedmetadata", function() {
    duration = audioElement.duration;
    totalDurationDisplay.textContent = formatTime(audioElement.duration);
});

audioElement.addEventListener("timeupdate", function() {
    var currentTime = audioElement.currentTime;
    currentTimeDisplay.textContent = formatTime(audioElement.currentTime);
    var progress = (currentTime / duration) * 100;
    seekBar.style.width = progress + "%";
});

// رویداد حرکت موس روی نوار جستجو برای نمایش زمان مربوطه
sArea.addEventListener("mousemove", function(event) {
    var sAreaWidth = sArea.offsetWidth;
    var offsetX = event.offsetX;
    var hoverTime = (offsetX / sAreaWidth) * duration;
    var formattedTime = formatTime(hoverTime);
    insTime.textContent = formattedTime;
    insTime.style.left = offsetX + "px";
});

// رویداد کلیک برای تنظیم زمان پخش
sArea.addEventListener("click", function(event) {
    var sAreaWidth = sArea.offsetWidth;
    var offsetX = event.offsetX;
    var clickTime = (offsetX / sAreaWidth) * duration;
    audioElement.currentTime = clickTime; // تنظیم زمان پخش به محل کلیک
});

// تابع برای قالب‌بندی زمان به صورت دقیقه و ثانیه
function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var seconds = Math.floor(seconds % 60);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
}