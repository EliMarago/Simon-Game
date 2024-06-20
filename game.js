let userClickedPattern = [];
let gamePattern = [];

const buttonColours = ["red", "blue", "green", "yellow"];

let level = 0;
let started = false;

document.addEventListener("keypress", function() {
  if (!started) {
    document.getElementById("level-title").textContent = "Level " + level;
    nextSequence();
    started = true;
  }
});

document.querySelectorAll(".btn").forEach(function(btn) {
  btn.addEventListener("click", function() {
    btn.classList.add("flash");
    btn.classList.add("pressed");
    setTimeout(function() {
      btn.classList.remove("flash");
      btn.classList.remove("pressed");
    }, 100);

    const userChosenColour = this.id;
    playSound(userChosenColour);

    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);

    checkAnswer(userClickedPattern.length - 1);
  });
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    document.querySelector("body").classList.add("game-over");
    document.querySelector("h1").textContent = "Game Over, Press Any Key to Restart";
    setTimeout(() => {
      document.querySelector("body").classList.remove("game-over");
    }, 300);
    
    startOver();  // Questa riga deve essere chiamata solo se la risposta è sbagliata
  }
}

const nextSequence = function() {
  userClickedPattern = [];  // Reset pattern

  level++;
  document.getElementById("level-title").textContent = "Level " + level;

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);

  document.getElementById(randomChosenColour).classList.add("flash");
  setTimeout(function() {
    document.getElementById(randomChosenColour).classList.remove("flash");
  }, 100);
}

function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}


