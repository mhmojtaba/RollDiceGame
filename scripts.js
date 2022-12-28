var activeplayer, roundScores, totalScore, lastDice, gettingScore;
const score = document.querySelector(".scoor--1");
const roll = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");
const newGame = document.querySelector(".btn--new");
const player = document.querySelectorAll(".player");
const total = document.getElementById("total");
let plays = true;

//start playing
startGame();
// rolling event
roll.addEventListener("click", rolling);

function rolling() {
  rool();
  getTotalScore();
}

function rool() {
  if (plays) {
    // making random dice
    let dice = Math.ceil(Math.random() * 6);
    document.querySelector(".dice").src = `dice-${dice}.png`;
    document.querySelector(".dice").style.display = "block";
    //console.log(dice);
    // role: if the player get 6 twice, their score will be cleared and it's next player turn
    if (lastDice === 6 && dice === 6) {
      // clearing the scores
      totalScore[activeplayer] = 0;
      document.querySelector(`.scoor--${activeplayer}`).textContent = 0;
      //next player turn
      changePlayer();
      // changing dice to 1
      //if the next player get 6 too, it'll be the third 6 but for the next player will be the first
      dice = 1;
    } else if (dice > 1) {
      //getting scores
      roundScores += dice;
      document.querySelector(`.current--${activeplayer}`).textContent =
        roundScores;
      // getting 1 is a foul and it's next player turn
    } else {
      changePlayer();
    }
    // storing the last dice
    lastDice = dice;
  }
}

//storing the scores in the ScoreBoard
hold.addEventListener("click", function () {
  if (plays && total.hasAttribute("disabled")) {
    totalScore[activeplayer] += roundScores;
    document.querySelector(`.scoor--${activeplayer}`).textContent =
      totalScore[activeplayer];
    console.log(total.value);
    //the winning pattern
    if (totalScore[activeplayer] >= gettingScore) {
      document.querySelector(`.name--${activeplayer}`).textContent = "WINER!!";
      document.querySelector(".dice").style.display = "none";
      plays = false;
    } else {
      changePlayer();
    }
  }
});

// reset the game
newGame.addEventListener("click", startGame);
// starting the game function
// start a new game and reset everything
function startGame() {
  document.querySelector(".scoor--0").textContent = 0;
  document.querySelector(".scoor--1").textContent = 0;
  document.querySelector(".current--0").textContent = 0;
  document.querySelector(".current--1").textContent = 0;
  document.querySelector(".player--0").classList.add("active");
  document.querySelector(".player--1").classList.remove("active");
  document.querySelector(`.name--0`).textContent = "Player1";
  document.querySelector(`.name--1`).textContent = "Player2";
  totalScore = [0, 0];
  activeplayer = 0;
  roundScores = 0;
  document.querySelector(".dice").style.display = "none";
  plays = true;
  total.removeAttribute("disabled");
  total.value = "";
}

// next player function
function changePlayer() {
  document.querySelector(`.current--${activeplayer}`).textContent = 0;
  roundScores = 0;
  activeplayer == 0 ? (activeplayer = 1) : (activeplayer = 0);
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".player--0").classList.toggle("active");
  document.querySelector(".player--1").classList.toggle("active");
}

// getting the final score by user
// if user set a wrogn value, it'll be automatically set by 100
function getTotalScore() {
  if (total.value === "" || total.value === NaN || total.value <= 0) {
    gettingScore = 100;
  } else {
    gettingScore = total.value;
  }

  total.setAttribute("disabled", "");
}
