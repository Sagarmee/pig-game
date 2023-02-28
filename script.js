"use strict";

const generate_roller_number = function () {
  var min = 1;
  var max = 6;

  return Math.trunc(Math.random() * (max - min + 1) + min);
};

const btn_roll = document.querySelector(".btn--roll");
const btn_hold = document.querySelector(".btn--hold");
const btn_new = document.querySelector(".btn--new");
var dice_img = document.querySelector(".dice");
var player01 = document.querySelector(".player--0");
var player02 = document.querySelector(".player--1");

dice_img.classList.add("hidden");

var currentScore = 0;
var scores = [0, 0];
var activeUser = 0;
var playerState = true;

btn_roll.addEventListener("click", function () {
  //generate the dice
  if (playerState) {
    var dice = generate_roller_number();

    //display the dice on the applicaton
    dice_img.classList.remove("hidden");
    dice_img.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activeUser}`).textContent =
        currentScore;
    } else {
      document.getElementById(`current--${activeUser}`).textContent = 0;
      currentScore = 0;
      activeUser = activeUser === 0 ? 1 : 0;
      player01.classList.toggle("player--active");
      player02.classList.toggle("player--active");
    }
  }
});

btn_hold.addEventListener("click", function () {
  if (playerState) {
    scores[activeUser] += currentScore;

    document.getElementById(`score--${activeUser}`).textContent =
      scores[activeUser];

    if (scores[activeUser] >= 20) {
      playerState = false;
      dice_img.classList.add("hidden");
      document
        .querySelector(`.player--${activeUser}`)
        .classList.add("player--winner");
    }

    document.getElementById(`current--${activeUser}`).textContent = 0;
    currentScore = 0;
    activeUser = activeUser === 0 ? 1 : 0;
    player01.classList.toggle("player--active");
    player02.classList.toggle("player--active");
  }
});
btn_new.addEventListener("click", function () {
  document.getElementById("score--0").textContent = 0;
  document.getElementById("score--1").textContent = 0;
  document.getElementsByClassName("current--0").textContent = 0;
  document.getElementsByClassName("current--1").textContent = 0;

  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
  activeUser = activeUser == 1 ? 0 : 1;
  playerState = true;
  currentScore = 0;
  scores = [0, 0];
});
