// Developer & Programmer Of The Professional Music Player Project, UI-UX : Mohammad Yasin Valipour
// Github: https://github.com/Yasinvalipoor
// Linkedin: https://www.linkedin.com/in/yasin-valipour-ivi/
var $ = document;
// Buttons
const playPreviousBtn = _id("play-previous");
const play_PauseBtn = _id("play-pause-button");
const playNextBtn = _id("play-next");
const repeat_repeat_1_Btn = _id("repeat-repeat-1");
const playShuffleBtn = _id("play-shuffle");
// Player
const albumArt = _id("album-art");
const playerTrack = _id("player-track");
// Times
const currentTimeDisplay = _id("current-time");
const totalDurationDisplay = _id("track-length");
// Audio - Source 
const audioElement = _id("audio-element");
const trackNameElement = _id("track-name");
const singerNameElement = _id("singer-name");
// Cover
const imgAlbumCoverElement = _id("album-cover");
const imgBgArtworkElement = _id("bg-artwork");
// SeekBar
var seekBar = _id("seek-bar");
var sArea = _id("s-area");
var insTime = _id("ins-time");
var sHover = _id("s-hover");
// Icons
const faPlay = $.querySelector(".fa-play");
const faPause = $.querySelector(".fa-pause");
const repeatIcon = $.querySelector(".repeat");
const repeat_1_Icon = $.querySelector(".repeat-1");
const sourceElement = $.querySelector("source");
// Lines Off Repeat And Shuffle Icons
const spanLineOffRepeat = document.querySelector('.span-line-off-repeat');
const spanLineOffShuffle = document.querySelector('.span-line-off-shuffle');
// Sources array
const musicSrc = [
    "DMT-Ashkan Kagan.mp3",
    "Precious Little-Hiatus.mp3",
    "Secret Whispers-Behdad Bahrami.mp3",
    "Cigarettes After Sex - Falling In Love.mp3",
    "Canis Setare.mp3"
];
// Variable
var musicIndex = 0;
var duration = 0;
var audioFile = sourceElement.src;
var jsmediatags = window.jsmediatags;
let repeatMode = 1;
// // 1 = Off
// // 2 = Repeat List Music 
// // 3 = Repeat Music 


// Function to shuffle and play a random song
const playRandomSong = () => {
    var musicRandomIndex = Math.floor(Math.random() * musicSrc.length);
    sourceElement.setAttribute("src", `Audio/${musicSrc[musicRandomIndex]}`);
    audioElement.load();
    updateCoverAndTags(sourceElement.src); // Update the song cover and tags
    audioElement.play();
    if (faPause.classList.contains("hidden-display")) { togglePlayPause(); } // Condition
};

// Function to update the UI for repeat mode
const updateRepeatUI = (iconVisible, loop, spanVisible) => {
    repeatIcon.classList.toggle("hidden-display", !iconVisible);
    repeat_1_Icon.classList.toggle("hidden-display", iconVisible);
    audioElement.loop = loop;
    spanLineOffRepeat.classList.toggle("hidden-display", !spanVisible);
};

// Initialize the player in "Off" mode
updateRepeatUI(true, false, true); // Set default to "Off" mode (1)
spanLineOffShuffle.classList.toggle("hidden-display", false); // Set default

// Handle the end of the audio element
audioElement.addEventListener('ended', function () {
    // First, check if shuffle mode is active (hidden-display means shuffle is active)
    if (spanLineOffShuffle.classList.contains("hidden-display")) {
        playRandomSong(); // Play a random song when shuffle mode is active
        return; // Exit to avoid executing repeat logic when shuffle is active
    }
    if (repeatMode === 1) { audioElement.pause(); }// Stop the player at the end and do nothing
    else if (repeatMode === 2) { playNextSong(); }// Repeat the music list
    else if (repeatMode === 3) {
        audioElement.currentTime = 0;
        audioElement.play(); // Repeat the current track
    }
});

// Handle repeat button click to cycle through modes
repeat_repeat_1_Btn.addEventListener("click", function () {
    repeatMode = (repeatMode % 3) + 1; // Cycle between 1 (Off), 2 (Repeat List), 3 (Repeat Track)
    if (repeatMode === 1) { updateRepeatUI(true, false, true); }// Off mode - enable diagonal line
    else if (repeatMode === 2) { updateRepeatUI(true, false, false); }// Repeat playlist - hide diagonal line
    else if (repeatMode === 3) { updateRepeatUI(false, true, false); }// Repeat current track - hide diagonal line
});

play_PauseBtn.addEventListener("click", function () {
    togglePlayPause();
    updateCoverAndTags(sourceElement.src);
});

playPreviousBtn.addEventListener("click", function () {
    musicIndex--;
    if (musicIndex < 0) { musicIndex = musicSrc.length - 1; } // Condition
    sourceElement.setAttribute("src", `Audio/${musicSrc[musicIndex]}`);
    audioElement.load();
    audioElement.play();
    updateCoverAndTags(sourceElement.src);
    if (faPause.classList.contains("hidden-display")) { togglePlayPause(); } // Condition
});

playNextBtn.addEventListener("click", function () {
    playNextSong();
});

// Handle shuffle button click to toggle shuffle mode
playShuffleBtn.addEventListener('click', function () {
    spanLineOffShuffle.classList.toggle("hidden-display");
    // Shuffle mode toggle only. Don't play random song immediately here.
});

audioElement.addEventListener("loadedmetadata", function () {
    duration = audioElement.duration;
    totalDurationDisplay.textContent = formatTime(audioElement.duration);
});

audioElement.addEventListener("timeupdate", function () {
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
sArea.addEventListener("mousemove", function (event) {
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

sArea.addEventListener("mouseleave", function () {
    sHover.style.display = "none";
    insTime.style.display = "none";
    insTime.style.left = "0px";
    insTime.style.marginLeft = "0px";
    insTime.textContent = '';
});

// Click event to set playback time
sArea.addEventListener("click", function (event) {
    var sAreaWidth = sArea.offsetWidth;
    var offsetX = event.offsetX;
    var clickTime = (offsetX / sAreaWidth) * duration;
    audioElement.currentTime = clickTime; // Setting the playback time to the click location
});

// Functions : 
function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var seconds = Math.floor(seconds % 60);
    if (seconds < 10) { seconds = "0" + seconds; }
    if (minutes < 10) { minutes = "0" + minutes; }
    return minutes + ":" + seconds;
}
function togglePlayPause() {
    faPlay.classList.toggle("hidden-display");
    faPause.classList.toggle("hidden-display");
    playerTrack.classList.toggle("active");
    albumArt.classList.toggle("active");
    faPlay.classList.contains("hidden-display") ? audioElement.play() : audioElement.pause(); // Condition
}
function _id(id_name) { return $.getElementById(id_name); }
function _class(class_name) { return $.getElementsByClassName(class_name); }
// A function to read the song information and display the cover
function updateCoverAndTags(audioFile) {
    jsmediatags.read(audioFile, {
        onSuccess: function (tag) {
            var tags = tag.tags;
            if (tags.picture) {
                var imageData = tags.picture.data;
                var base64String = "";
                for (var i = 0; i < imageData.length; i++) {
                    base64String += String.fromCharCode(imageData[i]);
                }
                var base64Image = `data:${tags.picture.format};base64,${window.btoa(base64String)}`;
                imgBgArtworkElement.style.backgroundImage = `url('${base64Image}')`;
                imgAlbumCoverElement.src = base64Image;
                singerNameElement.textContent = tag.tags.artist;
                trackNameElement.textContent = tag.tags.title;
            } else {
                console.log("Information Tags Not Found");
            }
        },
        onError: function (error) {
            console.log('Error: ', error.type, error.info);
        }
    });
}
function playNextSong() {
    musicIndex++;
    if (musicIndex > musicSrc.length - 1) { musicIndex = 0; } // Condition
    sourceElement.setAttribute("src", `Audio/${musicSrc[musicIndex]}`);
    audioElement.load();
    updateCoverAndTags(sourceElement.src);
    audioElement.play();
    if (faPause.classList.contains("hidden-display")) { togglePlayPause(); } // Condition
}
