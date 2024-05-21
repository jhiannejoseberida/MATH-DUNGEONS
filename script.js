const playButton = document.getElementById("playButton");
const mainMenu = document.getElementById("main-menu");
const inGame = document.getElementById("in-game");
const questionText = document.getElementById("question-text");
const monsterDiv = document.querySelector(".monster-div");
const gameOver = document.getElementById("game-over");
const lifeCounter = document.querySelector(".life-counter");
const playAgainButton = document.getElementById("playAgainButton");
const mainMenuButton = document.getElementById("mainMenuButton");
const scoreLabel = document.getElementById("score-label");
const highScoreLabel = document.getElementById("high-score-label");
const ingameScore = document.getElementById("ingame-score");

const choices = document.querySelectorAll(".choices-div-container button");

const problems = [
  {
    question: "Algebraic statement that two quantities are unequal is called...",
    choiceA: "Equality",
    choiceB: "Inequality",
    choiceC: "System",
    choiceD: "Solution",
    correctAnswer: "Inequality"
  },
  {
    question: "An equation is said to be linear if the variable is in...",
    choiceA: "4th degree",
    choiceB: "3rd degree",
    choiceC: "2nd degree",
    choiceD: "1st degree",
    correctAnswer: "1st degree"
  },
  {
    question: "The value of x in the equation 2x + 3 = x + 5 is ___",
    choiceA: "0",
    choiceB: "1",
    choiceC: "2",
    choiceD: "3",
    correctAnswer: "2"
  },
  {
    question: "It is a pictorial representation of the relation between two variables.",
    choiceA: "plane",
    choiceB: "axis",
    choiceC: "graph",
    choiceD: "point of origin",
    correctAnswer: "graph"
  },
  {
    question: "If f(x)=x^2 - 5x + 6 is to be divided by x-3, then the quotient will be ___",
    choiceA: "x + 2",
    choiceB: "x - 2",
    choiceC: "x - 1",
    choiceD: "x + 1",
    correctAnswer: "x - 2"
  },
  {
    question: "The father of logic is",
    choiceA: "Dionisus",
    choiceB: "Xerxes",
    choiceC: "Aristotle",
    choiceD: "Cyrus",
    correctAnswer: "Aristotle"
  },
  {
    question: "P -> Q is the symbol for 'if P then Q'. P is called ___",
    choiceA: "Negation",
    choiceB: "Tautology",
    choiceC: "Aristotle",
    choiceD: "Premise",
    correctAnswer: "Premise"
  },
  {
    question: "In how many ways can the 5 letters from the word MERRY be arranged in a row?",
    choiceA: "60",
    choiceB: "90",
    choiceC: "120",
    choiceD: "240",
    correctAnswer: "60"
  },
  {
    question: "In how many ways can 4 candidates sit around a table",
    choiceA: "4",
    choiceB: "6",
    choiceC: "9",
    choiceD: "24",
    correctAnswer: "6"
  },
  {
    question: "Evalute 8! divided by 5!3!",
    choiceA: "16",
    choiceB: "45",
    choiceC: "56",
    choiceD: "90",
    correctAnswer: "56"
  }
];

let playerLives = 0;
let playerScore = 0;
let highScore = 0;

playButton.addEventListener("click", function () {
  playerLives = 5;
  playerScore = 0;
  scoreLabel.innerHTML = "Score: " + playerScore;
  lifeCounter.style.backgroundImage = `url('life${playerLives}.png')`;
  mainMenu.classList.remove("active");
  showNewQuestion();
});

let randomProblem;

function showNewQuestion() {
  randomProblem = problems[Math.floor(Math.random() * problems.length)];
  questionText.textContent = randomProblem.question;

  choices.forEach((choiceButton, index) => {
    switch (index) {
      case 0:
        choiceButton.textContent = randomProblem.choiceA;
        break;
      case 1:
        choiceButton.textContent = randomProblem.choiceB;
        break;
      case 2:
        choiceButton.textContent = randomProblem.choiceC;
        break;
      case 3:
        choiceButton.textContent = randomProblem.choiceD;
        break;
      default:
        console.error("Unexpected number of choice buttons");
    }
  });

  let randomBackground = Math.floor(Math.random() * 3) + 1;
  const randomMonster = Math.floor(Math.random() * 5) + 1;
  monsterDiv.style.backgroundImage = `url('mons${randomMonster}.gif')`;
  randomBackground = Math.floor(Math.random() * 3) + 1;
  inGame.style.backgroundImage = `url('fight${randomBackground}.gif')`;
  inGame.classList.add("active");
}

const choicesContainer = document.querySelector(".choices-div-container");

choicesContainer.addEventListener("click", function(event) {
  if (event.target.tagName === "BUTTON") { 
    const clickedButton = event.target;
    const clickedAnswer = clickedButton.textContent;
    checkAnswer(clickedAnswer, randomProblem.correctAnswer);
  }
});

function checkAnswer(clickedAnswer, correctAnswer) {
  if (clickedAnswer === correctAnswer) {
    playerScore++;
    ingameScore.innerHTML = "Score: " + playerScore;
    showNewQuestion();
  } else {
    playerLives--;
    lifeCounter.style.backgroundImage = `url('life${playerLives}.png')`;
    if (playerLives === 0) {
        inGame.classList.remove("active");
        gameOver.classList.add("active");
        scoreLabel.innerHTML = "Score: " + playerScore;
        if (playerScore > highScore) {
            highScore = playerScore;
        }
        highScoreLabel.innerHTML = "High Score: " + highScore;
    }
  }
}

playAgainButton.addEventListener("click", function () {
    playerLives = 5;
    playerScore = 0;
    lifeCounter.style.backgroundImage = `url('life${playerLives}.png')`;
    gameOver.classList.remove("active");
    showNewQuestion();
});

mainMenuButton.addEventListener("click", function () {
    gameOver.classList.remove("active");
    mainMenu.classList.add("active");
});

if (playerLives === 0) {
    playerScore = 0;
}
