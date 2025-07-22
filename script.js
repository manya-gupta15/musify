console.log("Welcome to Spotify");


let songIndex = 0;
let audioElement = new Audio('songs0.mp3'); // Provide correct relative path
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressbar');
let songItems = Array.from(document.getElementsByClassName('songitem'));
let songInfo=document.querySelector('.songinfo');
let songs = [
    {
        songName: "If the world was ending",
        filePath: "songs0.mp3", // <-- Fix this path
        coverPath: "size_m.jpg"
     
    },
    {
        songName: "Baby",
        filePath: "songs1.mp3", // <-- Fix this path
        coverPath: "baby.jpeg"
    },
    {
        songName: "Galway Girl",
        filePath: "songs2.mp3", // <-- Fix this path
     coverPath: "galway.jpg"
    },
    {
        songName: "CO2",
        filePath: "songs3.mp3", // <-- Fix this path
        coverPath: "co2.jpeg"
    },
    {
        songName: "Let her go",
        filePath: "songs4.mp3", // <-- Fix this path
        coverPath: "let.png"
    },
    {
        songName: "Perfect",
        filePath: "songs5.mp3", // <-- Fix this path
        coverPath: "perfect.jpeg"
    },
    {
        songName: "Raabta",
        filePath: "songs6.mp3", // <-- Fix this path
        coverPath: "raabta.jpg"
    },
    {
        songName: "Dil diyan gallan",
        filePath: "songs7.mp3", // <-- Fix this path
        coverPath: "ddg.jpg"
    },
    {
        songName: "With you",
        filePath: "songs8.mp3", // <-- Fix this path
        coverPath: "wy.jpg"
    },



  
   
];
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByTagName("span")[0].innerText = songs[i].songName;
});

// === MASTER PLAY BUTTON ===
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        updatePlayIcon(songIndex);
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        makeAllPlays();
    }
});

const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');

audioElement.addEventListener('timeupdate', () => {
    if (audioElement.duration) {
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;

        // Format current time
        let currentMinutes = Math.floor(audioElement.currentTime / 60);
        let currentSeconds = Math.floor(audioElement.currentTime % 60).toString().padStart(2, '0');
        currentTimeEl.innerText = `${currentMinutes}:${currentSeconds}`;

        // Format total time
        let totalMinutes = Math.floor(audioElement.duration / 60);
        let totalSeconds = Math.floor(audioElement.duration % 60).toString().padStart(2, '0');
        totalTimeEl.innerText = `${totalMinutes}:${totalSeconds}`;
    }
});

// Seek functionality
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});


// Pause all other songs when one is played
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('timestamp')).forEach((wrapper) => {
        const icon = wrapper.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-pause-circle');
            icon.classList.add('fa-play-circle');
        }
    });
};

const updatePlayIcon = (index) => {
    makeAllPlays();
    let iconWrapper = document.getElementsByClassName('timestamp')[index];
    let icon = iconWrapper.querySelector('i');
    icon.classList.remove('fa-play-circle');
    icon.classList.add('fa-pause-circle');
};

// Add event listeners to individual song play buttons
Array.from(document.getElementsByClassName('timestamp')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        let icon = e.target;

        // If user clicked on <span> instead of <i>, fix the target
        if (icon.tagName.toLowerCase() !== 'i') {
            icon = icon.querySelector('i');
        }
        if (songIndex === i && !audioElement.paused) {
            // Pause if the same song is playing
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        } else {
            // Play selected song
            songIndex = i;
            audioElement.src = songs[songIndex].filePath;
            audioElement.currentTime = 0;
            audioElement.play();
            updatePlayIcon(i);

            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');

            // Update song info text
            if (songInfo) {
                songInfo.innerText = songs[songIndex].songName;
            }
        }
    });
});

// === Auto Reset Icon on Song End ===
audioElement.addEventListener('ended', () => {
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    makeAllPlays();
});
// Get previous/next buttons
let next = document.getElementById('next');
let previous = document.getElementById('previous');

// Helper function to play selected song
function playSongByIndex(index) {
    audioElement.src = songs[index].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    // Update play/pause icons
    updatePlayIcon(index);
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    // Update the song title
    if (songInfo) {
        songInfo.innerText = songs[index].songName;
    }
}

// NEXT BUTTON
next.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length; // wraps to 0 after last
    playSongByIndex(songIndex);
});

// PREVIOUS BUTTON
previous.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length; // wraps to last
    playSongByIndex(songIndex);
});
