const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "Hyper Text Markup Leveler"],
    answer: 1
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: 3
  },
  {
    question: "CSS stands for?",
    options: ["Colorful Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets"],
    answer: 0
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 20;
let timerId;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("nextBtn");
const quizContainer = document.querySelector(".quiz-container");
const resultContainer = document.getElementById("resultContainer");
const finalScoreEl = document.getElementById("finalScore");

function loadQuestion() {
  clearInterval(timerId);
  timeLeft = 20;
  timerEl.textContent = timeLeft;
  timerEl.classList.remove("low-time");

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.addEventListener("click", () => selectAnswer(index, btn));
    optionsEl.appendChild(btn);
  });

  startTimer();
}

function startTimer() {
  timerId = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 5) {
      timerEl.classList.add("low-time");
    }

    if (timeLeft <= 0) {
      clearInterval(timerId);
      disableOptions();
      highlightCorrectAnswer();
    }
  }, 1000);
}

function selectAnswer(selectedIndex, btn) {
  clearInterval(timerId);
  const q = questions[currentQuestion];

  if (selectedIndex === q.answer) {
    btn.classList.add("correct");
    score++;
    scoreEl.textContent = "Score: " + score;
  } else {
    btn.classList.add("wrong");
    highlightCorrectAnswer();
  }

  disableOptions();
}

function highlightCorrectAnswer() {
  const q = questions[currentQuestion];
  const buttons = optionsEl.querySelectorAll("button");
  buttons[q.answer].classList.add("correct");
}

function disableOptions() {
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = true);
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
});

function endQuiz() {
  clearInterval(timerId);
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";
  finalScoreEl.textContent = `You scored ${score} out of ${questions.length}`;
}

loadQuestion();