let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoplay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}


document.querySelector('.js-rock-button')
  .addEventListener('click' , () => {
    playGame('Rock');
  })

document.querySelector('.js-paper-button')
  .addEventListener('click' , () => {
    playGame('Paper');
  })

document.querySelector('.js-scissors-button')
  .addEventListener('click' , () => {
    playGame('Scissors');
  })


document.body.addEventListener('keydown' , (event) => {
  if (event.key === 'r') {
    playGame('Rock');
  } else if (event.key === 'p') {
    playGame('Paper');
  } else if (event.key === 's') {
    playGame('Scissors');
  }
})
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "You Lose!";
    } else if (computerMove === "Paper") {
      result = "You Won!";
    } else {
      result = "Tie";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "You Won!";
    } else if (computerMove === "Paper") {
      result = "Tie";
    } else {
      result = "You Lose!";
    }
  } else if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Tie";
    } else if (computerMove === "Paper") {
      result = "You Lose!";
    } else {
      result = "You Won!";
    }
  }

  if (result === "You Won!") {
    score.wins += 1;
  } else if (result === "You Lose!") {
    score.losses += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-moves").innerHTML =
    `You <img class="move-button-png" src="images/${playerMove}-emoji.png">
          <img class="move-button-png" src="images/${computerMove}-emoji.png"> Computer
          `;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  if (randomNumber < 1 / 3) {
    return "Rock";
  } else if (randomNumber < 2 / 3) {
    return "Paper";
  } else {
    return "Scissors";
  }
}

function updateScoreElement() {
  document.querySelector(".js-score-button").innerHTML =
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
