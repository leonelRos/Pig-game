/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//create two players and both play in rounds and the active player for each turn// we Add the dice random number from 1 to 6

var players, roundScore, activePlayer, gamePlayed;

init();

document.querySelector(".btn-roll").addEventListener("click", function () {
  //this is after the game is done every event listener becomes null
  if (gamePlayed) {
    //this ramdon numbers from 1 to 6
    var dice = Math.floor(Math.random() * 6) + 1;
    //we attached our class dice to rollDice
    var rollDice = document.querySelector(".dice");
    //to display the dice again we use 'block'
    rollDice.style.display = "block";
    //we show random images of the dice  to display in the dice
    rollDice.src = "dice-" + dice + ".png";

    //update the player current score if the dice rolled is not 1
    if (dice !== 1) {
      roundScore += dice;
      //we want it to show in the current box of each player
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //we use ternary operator to check active players and swtich when they rolled 1
      renderNextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlayed) {
    //we want to check the score with active players
    players[activePlayer] += roundScore;
    //we want to show in the score class
    document.querySelector("#score-" + activePlayer).textContent =
      players[activePlayer];
    var inputScore = document.querySelector(".input-score").value;
    var winnerScore;

    if (inputScore) {
      winnerScore = inputScore;
    } else {
      winnerScore = 100;
    }
    //we want to check the winner
    if (players[activePlayer] >= winnerScore) {
      document.querySelector("#name-" + activePlayer).textContent =
        "Winner by a landslide!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlayed = false;
    } else {
      renderNextPlayer();
      // document.querySelector('.')
    }
  }
});

function renderNextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  //we want to set each current box to 0 after rolling 1
  document.querySelector("#current-0").textContent = "0";
  document.querySelector("#current-1").textContent = "0";

  //we are changing the active lass in the html to each current player
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  players = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlayed = true;

  //DOM manipulation

  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player1";
  document.getElementById("name-1").textContent = "Player2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.add("active");
}
