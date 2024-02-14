"use strict";

const scores = document.querySelectorAll(".score");
const currentScores = document.querySelectorAll(".current-score");
const rollBtn = document.querySelector(".btn--roll");
const newBtn = document.querySelector(".btn--new");
const holdBtn = document.querySelector(".btn--hold");
const players = document.querySelectorAll(".player");
const diceImage = document.querySelector(".dice");
let currentScore,
  active,
  score,
  isThereWinner,
  limit = 100;

const newGame = () => {
  score = [0, 0];
  currentScore = 0;
  isThereWinner = false;
  active = 0;

  for (let i = 0; i < scores.length; i++) {
    scores[i].textContent = 0;
    currentScores[i].textContent = 0;

    if (players[i].classList.contains("player--winner")) {
      players[i].classList.remove("player--winner");
    }
  }

  // players[0].classList.remove("player--winner");
  // players[1].classList.remove("player--winner");

  players[0].classList.add("player--active");
  players[1].classList.remove("player--active");

  diceImage.classList.add("hidden");
};
newGame();
newBtn.addEventListener("click", newGame);

const switchPlayer = () => {
  currentScore = 0;
  currentScores[active].textContent = currentScore;
  active = active === 0 ? 1 : 0;

  for (let i = 0; i < players.length; i++) {
    players[i].classList.toggle("player--active");
  }
};

rollBtn.addEventListener("click", () => {
  if (!isThereWinner) {
    // get random dice roll score
    const diceScore = Math.trunc(Math.random() * 6) + 1;

    // display the dice roll score
    diceImage.classList.remove("hidden");
    diceImage.src = `images/dice-${diceScore}.png`;

    if (diceScore === 1) {
      switchPlayer();
    } else {
      // adding the score to current
      currentScore += diceScore;
      currentScores[active].textContent = currentScore;
    }
  }
});

holdBtn.addEventListener("click", () => {
  if (!isThereWinner) {
    score[active] += currentScore;
    scores[active].textContent = score[active];

    if (score[active] >= limit) {
      players[active].classList.add("player--winner");
      players[active].classList.remove("player--active");
      diceImage.classList.add("hidden");
      isThereWinner = true;
    } else {
      switchPlayer();
    }
  }
});
