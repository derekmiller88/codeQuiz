var timerEl = document.getElementById('countdown');

var timeLeft = 60;
var feedbackHtmlCorrect = "<p>Correct!</p>";
var feedbackHtmlIncorrect = "<p>Incorrect</p>";
var element2 = document.getElementById("feedback");

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    element2.style.display = 'block';
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
        element2.innerHTML = feedbackHtmlCorrect;
        wait();
    } else {
        timeLeft = timeLeft - 10;
        element2.innerHTML = feedbackHtmlIncorrect;
        wait(); 
    }
    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}



function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        } 
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};

function showScores() {
    stopFunction();
    var gameOverHTML = "<h1>All Done!</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + timeLeft + "</h2>";
    gameOverHTML += "<p>Enter Initials: " + `<input type = "text" id="textScore" />`  + `<button type="button" id="buttonScore" onclick="finalScore()">Submit</button>`+ "</p>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

function finalScore() {
    var highScoreHTML = "<h1>HighScores</h1>";
    highScoreHTML += `<p><span id="finalScore">`+ document.querySelector('#textScore').value + ": " + timeLeft + `</span></p>`;
    highScoreHTML += `<button type="button" id="buttonScore" onclick="goBack()">Go Back</button>` + "   " + `<button type="button" id="buttonScore" onclick="clearScore()">Clear Highscores</button>`;
    var element = document.getElementById("quiz");
    
    element.innerHTML = highScoreHTML;
    
    //renderLastRegistered();
}

function renderLastRegistered() {
    var finalScore = document.querySelector('#finalScore');
    finalScore.textContent = initialInput;
  }

// Timer that counts down from 120
var timeInterval = setInterval(countdown, 1000);
function countdown() {
  
    // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
      if(timeLeft>=1) {
        timerEl.textContent = "Time: " + timeLeft--;
      } else {
        showScores();
      }
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function wait() {
    await sleep(1000);
    element2.style.display = "none";
}

function clearScore() {
    var finalScore = document.querySelector('#finalScore');
    finalScore.textContent = "";
}

function goBack() {
    populate();
}

function stopFunction() {
    clearInterval(timeInterval);
    timerEl.textContent = "";
}

// create questions here
var questions = [
    new Question("What is the HTML tag under which one can write the JavaScript code?", ["1. javascript", "2. scripted","3. script", "4. js"], "3. script"),
    new Question("Choose the correct JavaScript syntax to change the content of the following HTML code.", ["1. document.getElement(“geek”).innerHTML=”I am a Geek”;", "2. document.getElementById(“geek”).innerHTML=”I am a Geek”;", "3. document.getId(“geek”)=”I am a Geek”;", "4. document.getElementById(“geek”).innerHTML=I am a Geek;"], "2. document.getElementById(“geek”).innerHTML=”I am a Geek”;"),
    new Question("Which of the following is the correct syntax to display “GeeksforGeeks” in an alert box using JavaScript?", ["1. alertbox(“GeeksforGeeks”);", "2. msg(“GeeksforGeeks”);","3. msgbox(“GeeksforGeeks”);", "4. alert(“GeeksforGeeks”);"], "4. alert(“GeeksforGeeks”);"),
    new Question("What is the correct syntax for referring to an external script called “geek.js”?", [`1. script src=”geek.js"`, `2. script href=”geek.js”`, `3. script ref=”geek.js”`, `4. script name=”geek.js”`], `1. script src=”geek.js"`),
    new Question("Predict the output of the following JavaScript code.", ["1. 16", "2. Compilation Error", "3. 88", "4. Run Time Error"], "3. 88")
];

// create quiz
var quiz = new Quiz(questions);

//start timer
countdown();

// display quiz
populate();