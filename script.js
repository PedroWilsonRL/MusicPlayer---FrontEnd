const musicData = [ 
  {
    title: "Harmony",
    artist: "Timbaland",
    src: "Musics/Harmony From Skylanders Academy.mp3",
  },
  {
    title: "The Real Me",
    artist: "Bruce Retief",
    src: "Musics/The Real Me Loyiso_Khumba movie soundtrack.mp3",
  },
  {
    title: "Bye Bye Bye",
    artist: "'N Sync",
    src: "Musics/NSYNC_Bye Bye Bye Official Video from Deadpool and Wolverine.mp3",
  },
  {
    title: "Teen Titans",
    artist: "Puffy Ami Yumi",
    src: "Musics/puffy amiyumi  teen titans theme 03092024142147 m4a  130 kbps.mp3",
  },
];

const musicItems = document.querySelectorAll(".music-item");
const audioPlayer = document.getElementById("audio-player");
const audioSource = document.getElementById("audio-source");
const currentTitle = document.getElementById("current-title");
const currentArtist = document.getElementById("current-artist");
const playPauseBtn = document.getElementById("play-pause-btn");
const progressBarTrack = document.querySelector(".progress-track img:first-child");
const progressBall = document.querySelector(".progress-ball");
const currentTimeDisplay = document.getElementById("current-time");
const totalTimeDisplay = document.getElementById("total-time");

let isPlaying = false;
let isDragging = false;

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

audioPlayer.addEventListener("loadedmetadata", () => {
  totalTimeDisplay.textContent = formatTime(audioPlayer.duration);
});

audioPlayer.addEventListener("timeupdate", () => {
  currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
  updateProgressBall();
});

const updatePlayPauseButton = () => {
  playPauseBtn.src = isPlaying ? "images/pause.png" : "images/play.png";
};

playPauseBtn.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    isPlaying = true;
  } else {
    audioPlayer.pause();
    isPlaying = false;
  }
  updatePlayPauseButton();
});

const updateProgressBall = () => {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  const trackWidth = progressBarTrack.offsetWidth;
  progressBall.style.left = `${(progress / 100) * trackWidth}px`;
};

const setAudioProgress = (event) => {
  const trackWidth = progressBarTrack.offsetWidth;
  const trackLeft = progressBarTrack.getBoundingClientRect().left;
  const clickPosition = event.clientX - trackLeft;
  const progress = clickPosition / trackWidth;
  audioPlayer.currentTime = progress * audioPlayer.duration;
  updateProgressBall();
};

progressBall.addEventListener("mousedown", () => {
  isDragging = true;
});
window.addEventListener("mousemove", (event) => {
  if (isDragging) {
    setAudioProgress(event);
  }
});
window.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
  }
});

audioPlayer.addEventListener("timeupdate", updateProgressBall);

progressBarTrack.addEventListener("click", setAudioProgress);

audioPlayer.addEventListener("ended", () => {
  isPlaying = false;
  updatePlayPauseButton();
});

musicItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    const music = musicData[index];
    audioSource.src = music.src;
    audioPlayer.load();
    audioPlayer.play();

    currentTitle.textContent = music.title;
    currentArtist.textContent = `by ${music.artist}`;
    isPlaying = true;
    updatePlayPauseButton();
  });
});

const handleArrowKeys = (event) => {
  if (audioPlayer.paused) return; 

  if (event.key === "ArrowRight") {
    audioPlayer.currentTime += 1; 
  } else if (event.key === "ArrowLeft") {
    audioPlayer.currentTime -= 1; 
  }
};

const handleSpaceKey = (event) => {
  if (event.code === "Space") {
    if (audioPlayer.paused) {
      audioPlayer.play();
      isPlaying = true;
    } else {
      audioPlayer.pause();
      isPlaying = false;
    }
    updatePlayPauseButton();
    event.preventDefault(); 
  }
};

window.addEventListener("keydown", handleArrowKeys);
window.addEventListener("keydown", handleSpaceKey); 





  
