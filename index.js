document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-btn');
  const questionContainer = document.getElementById('question-container');
  const questionElement = document.getElementById('question');
  const answerButtonsElement = document.getElementById('answer-buttons');
  const timerElement = document.getElementById('time');
  const endScreen = document.getElementById('end-screen');
  const finalScore = document.getElementById('final-score');
  const usernameInput = document.getElementById('username');
  const submitScoreButton = document.getElementById('submit-score');
  const highScoresList = document.getElementById('high-scores'); // Ensure this element exists in your HTML

  let shuffledQuestions, currentQuestionIndex;
  let timer = 80;
  let score = 0;
  let timerInterval;

  startButton.addEventListener('click', startGame);

  function startGame() {
    score = 0;
    timer = 80;
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove('hide');
    timerInterval = setInterval(updateTimer, 1000);
    setNextQuestion();
  }

  function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }

  function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('btn');
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', selectAnswer);
      answerButtonsElement.appendChild(button);
    });
  }

  function resetState() {
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }

  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
      score += 10; // Increase score
    } else {
      timer -= 10; // Decrease timer
      if (timer < 0) timer = 0;
      timerElement.textContent = timer;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length && timer > 0) {
      setNextQuestion();
    } else {
      endGame();
    }
  }

  function updateTimer() {
    if (timer <= 0) {
      clearInterval(timerInterval);
      endGame();
      return;
    }
    timer--;
    timerElement.textContent = timer;
  }

  function endGame() {
    clearInterval(timerInterval);
    questionContainer.classList.add('hide');
    endScreen.classList.remove('hide');
    finalScore.textContent = `Your score: ${score}`;
  }

  submitScoreButton.addEventListener('click', () => {
    const username = usernameInput.value;
    if (!username) {
      alert('Please enter your initials!');
      return;
    }

    const newScore = { score, username };
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5); // Keep only top 5 scores
    localStorage.setItem('highScores', JSON.stringify(highScores));

    displayHighScores();
    endScreen.classList.add('hide');
    startButton.classList.remove('hide');
    usernameInput.value = ''; // Reset input field
  });

  function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScoresList.innerHTML = highScores.map(score => `<li>${score.username} - ${score.score}</li>`).join('');
  }

  // Call displayHighScores initially to show any existing high scores
  displayHighScores();


  // Define your questions array with question and answers
  const questions = [
    {
      question: "What is the correct syntax for referring to an external script called 'app.js'?",
      answers: [
        { text: "<script href='app.js'>", correct: false },
        { text: "<script name='app.js'>", correct: false },
        { text: "<script src='app.js'>", correct: true },
        { text: "<script file='app.js'>", correct: false }
      ]
    },
    {
      question: "How do you create a function in JavaScript?",
      answers: [
        { text: "function:myFunction()", correct: false },
        { text: "function = myFunction()", correct: false },
        { text: "function myFunction()", correct: true },
        { text: "function: myFunction()", correct: false }
      ]
    },
    {
      question: "How can you add a comment in JavaScript?",
      answers: [
        { text: "<!--This is a comment-->", correct: false },
        { text: "'This is a comment", correct: false },
        { text: "// This is a comment", correct: true },
        { text: "* This is a comment *", correct: false }
      ]
    },
    {
      question: "What is the correct way to write a JavaScript array?",
      answers: [
        { text: "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')", correct: false },
        { text: "var colors = (1:'red', 2:'green', 3:'blue')", correct: false },
        { text: "var colors = ['red', 'green', 'blue']", correct: true },
        { text: "var colors = 'red', 'green', 'blue'", correct: false }
      ]
    },
    {
      question: "Which event occurs when the user clicks on an HTML element?",
      answers: [
        { text: "onchange", correct: false },
        { text: "onclick", correct: true },
        { text: "onmouseover", correct: false },
        { text: "onmouseclick", correct: false }
      ]
    },
    {
      question: "How do you declare a JavaScript variable?",
      answers: [
        { text: "var carName;", correct: true },
        { text: "v carName;", correct: false },
        { text: "variable carName;", correct: false },
        { text: "var = carName;", correct: false }
      ]
    },
    {
      question: "Which operator is used to assign a value to a variable?",
      answers: [
        { text: "*", correct: false },
        { text: "-", correct: false },
        { text: "=", correct: true },
        { text: "x", correct: false }
      ]
    },
    {
      question: "What will the following code return: Boolean(10 > 9)",
      answers: [
        { text: "NaN", correct: false },
        { text: "false", correct: false },
        { text: "true", correct: true },
        { text: "undefined", correct: false }
      ]
    },
    {
      question: "How do you round the number 7.25, to the nearest integer?",
      answers: [
        { text: "Math.rnd(7.25)", correct: false },
        { text: "Math.round(7.25)", correct: true },
        { text: "rnd(7.25)", correct: false },
        { text: "round(7.25)", correct: false }
      ]
    },
    {
      question: "How do you find the number with the highest value of x and y?",
      answers: [
        { text: "Math.ceil(x, y)", correct: false },
        { text: "top(x, y)", correct: false },
        { text: "Math.max(x, y)", correct: true },
        { text: "ceil(x, y)", correct: false }
      ]
    }
  ]; 
  

});


