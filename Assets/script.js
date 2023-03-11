const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        question: "What Country won the first ever world cup?",
        choice1: "Argentina",
        choice2: "Uruguay",
        choice3: "Brazil",
        choice4: "Usa",
        answer: 2,
    },
    {
        question: "The Olympics are held every how many years?",
        choice1: "2",
        choice2: "6",
        choice3: "4",
        choice4: "8",
        answer: 3,
    },
    {
        question: "What does NBA stand for?",
        choice1: "Nation Basketball Alliance",
        choice2: "National Basket Association",
        choice3: "National Basketball Alliance",
        choice4: "National Basketball Association",
        answer: 4,
    },
    {
        question: "How much does an NFL football weigh?",
        choice1: "1 Pound",
        choice2: "3 Pounds",
        choice3: "5 Pounds",
        choice4: "2 Pounds",
        answer: 1,
    },
    {
        question: "How many players are on a baseball Field?",
        choice1: "12",
        choice2: "9",
        choice3: "11",
        choice4: "8",
        answer: 2,
    },
    
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
  };
  
  getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
      //go to the end page
      return window.location.assign("/end.html");
    }
    questionCounter++;
    progressText.innerText = ` ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    // progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;
  
    choices.forEach(choice => {
      const number = choice.dataset["number"];
      choice.innerText = currentQuestion["choice" + number];
    });
  
    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
  };
  
  choices.forEach(choice => {
    choice.addEventListener("click", e => {
      if (!acceptingAnswers) return;
  
      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];
  
      const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
  
      if (classToApply === "correct") {
        incrementScore(CORRECT_BONUS);
      }
  
      selectedChoice.parentElement.classList.add(classToApply);
  
      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);
    });
  });
  
  incrementScore = num => {
    score += num;
    scoreText.innerText = score;
  };
  
  startGame();











