const display = document.getElementById("display");

// Play sound safely
function playSound(key) {
  const audio = document.getElementById(key);
  if (!audio) return;

  const button = audio.parentElement;

  audio.currentTime = 0;
  audio.play();

  display.textContent = "Sonar: " + button.id;
}

// Click events
document.querySelectorAll(".drum-pad").forEach((pad) => {
  pad.addEventListener("click", function () {
    const key = this.textContent.trim();
    playSound(key);
  });
});

// Keyboard events
document.addEventListener("keydown", function (e) {
  const key = e.key.toUpperCase();
  playSound(key);
});