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
const sourceElement = $.querySelector("source");
// Sources array
const musicSrc = [
    "DMT-Ashkan Kagan.mp3",
    "Precious Little-Hiatus.mp3",
    "Secret Whispers-Behdad Bahrami.mp3",
];
// Variable
var musicIndex = 0;
var duration = 0;
var audioFile = sourceElement.src;
var jsmediatags = window.jsmediatags;





play_PauseBtn.addEventListener("click", function () {
    togglePlayPause();
    updateCoverAndTags(sourceElement.src);
});

playPreviousBtn.addEventListener("click", function () {
    musicIndex--;
    if (musicIndex < 0) { musicIndex = 2; } // Condition
    sourceElement.setAttribute("src", `Audio/${musicSrc[musicIndex]}`);
    audioElement.load();
    audioElement.play();
    updateCoverAndTags(sourceElement.src);
    if (faPause.classList.contains("hidden-display")) { togglePlayPause(); } // Condition
});

playNextBtn.addEventListener("click", function () {
    musicIndex++;
    if (musicIndex > musicSrc.length - 1) { musicIndex = 0; } // Condition
    sourceElement.setAttribute("src", `Audio/${musicSrc[musicIndex]}`);
    audioElement.load();
    updateCoverAndTags(sourceElement.src); // به‌روزرسانی کاور آهنگ جدید
    audioElement.play();
    if (faPause.classList.contains("hidden-display")) { togglePlayPause(); } // Condition
});




audioElement.addEventListener("loadedmetadata", function () {
    duration = audioElement.duration;
    totalDurationDisplay.textContent = formatTime(audioElement.duration);
    // Solution 1
    // var fileName = audioElement.querySelector("source").src.split("/").pop();
    // fileName = decodeURIComponent(fileName.split(".")[0].split('-'));
    // if (fileName.split(',').length === 2) {
    //     var artistName = fileName.split(',')[0];
    //     var songTitle = fileName.split(',')[1];
    //     trackNameElement.textContent = songTitle;
    //     singerNameElement.textContent = artistName;
    // }
    // Solution 2
    // var fileName = audioElement.querySelector("source").src.split("/").pop();
    // fileName = decodeURIComponent(fileName.split(".")[0]); // Decode the file name and remove the extension
    // // Split the file name by the hyphen and trim whitespace
    // var [songTitle, artistName] = fileName.split('-').map(part => part.trim());
    // if (songTitle && artistName) {
    //     trackNameElement.textContent = songTitle;
    //     singerNameElement.textContent = artistName;
    // }
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