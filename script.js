let progress = document.getElementById("progress");
let ctrlicon = document.getElementById("ctrlicon");
let song = document.getElementById("song");

song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};

function playPause() {
  if (!song.paused) {
    song.pause();
    ctrlicon.classList.remove("fa-pause");
    ctrlicon.classList.add("fa-play");
  } else {
    song.play().then(() => {
      ctrlicon.classList.remove("fa-play");
      ctrlicon.classList.add("fa-pause");
    }).catch((error) => {
      console.error("Playback prevented:", error);
    });
  }
}

song.ontimeupdate = function () {
  progress.value = song.currentTime;
};

progress.oninput = function () {
  song.currentTime = progress.value;
  if (song.paused) {
    song.play().then(() => {
      ctrlicon.classList.add("fa-pause");
      ctrlicon.classList.remove("fa-play");
    });
  }
};