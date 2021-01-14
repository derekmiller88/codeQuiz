/* global variable declarations here */
/* timerEl used for the countdown function */
var timerEl = document.getElementById('countdown');
var timeLeft = 60;

/* sets the feedback content when user selects correct/incorrect option */
var feedbackHtmlCorrect = "<p>Correct!</p>";
var feedbackHtmlIncorrect = "<p>Incorrect</p>";
var element2 = document.getElementById("feedback");

/* Sets the starting variables for the quiz. 
these variables are used in determining whether or not we have completed the test and what question we are on */
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

/* pulls the current question the user is on */
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

/* determines if the user selected the correct question
also triggers the timer to reduce time when user selects incorrect answer
also increments the score and questionIndex variables which are used to determine which question to display next */
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

/* used to determine if we are at the end of the questions array
if so, this will resolve to true and is used to stop the test and display the score */
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}

/* passes the user input to the variables used in the quiz */
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

/* determines if the answer is correct */
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}

/* main function of the quiz, continuously runs the for loop to move through the quiz questions
if the quiz is not ended, will set the next quiz question and display
determines if the quiz is ended by calling the isEnded function above and then runs the showScores function
 */
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

/* this function will assess what selection the user made 
also run the populate function again to continuously loop through quiz questions*/
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};

/* dynamically displays the result of the user's test.
displays the user score as well as input box for user ID and button to submit score*/
function showScores() {
    stopFunction();
    var gameOverHTML = "<h1>All Done!</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + timeLeft + "</h2>";
    gameOverHTML += "<p>Enter Initials: " + `<input type = "text" id="textScore" />`  + `<button type="button" id="buttonScore" onclick="finalScore()">Submit</button>`+ "</p>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

/* dynamically displays the final score page
this page is used to display the user's saved high score */
function finalScore() {
    var highScoreHTML = "<h1>HighScores</h1>";
    highScoreHTML += `<p><span id="finalScore">`+ document.querySelector('#textScore').value + ": " + timeLeft + `</span></p>`;
    highScoreHTML += `<button type="button" id="buttonScore" onclick="goBack()">Go Back</button>` + "   " + `<button type="button" id="buttonScore" onclick="clearScore()">Clear Highscores</button>`;
    var element = document.getElementById("quiz");
    
    element.innerHTML = highScoreHTML;
}

// Timer function is used to count down from 60 seconds to 0
//also used to end quiz and set score to 0 if user runs out of time
var timeInterval = setInterval(countdown, 1000);
function countdown() {

      if(timeLeft>=1) {
        timerEl.textContent = "Time: " + timeLeft--;
      } else {
        showScores();
      }
};

/* following two functions (sleep() and wait()) both used in the Quiz.prototype.guess function above
the wait function is called to remove the feedback text after 1 second */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function wait() {
    await sleep(1000);
    element2.style.display = "none";
}

/* clears out the list of saved user scores in the finalScore page */
function clearScore() {
    var finalScore = document.querySelector('#finalScore');
    finalScore.textContent = "";
}

/* used in the goBack button on the finalScore page. used to literally go back to the score result page */
function goBack() {
    populate();
}

/* used to stop the timer (which is also used as the user score) and remove the timer from being displayed */
function stopFunction() {
    clearInterval(timeInterval);
    timerEl.textContent = "";
}

// questions[] array used to generate questions and answers for quiz
var questions = [
    new Question("What is the HTML tag under which one can write the JavaScript code?", ["1. javascript", "2. scripted","3. script", "4. js"], "3. script"),
    new Question("Choose the correct JavaScript syntax to change the content of the following HTML code.", ["1. document.getElement(“geek”).innerHTML=”I am a Geek”;", "2. document.getElementById(“geek”).innerHTML=”I am a Geek”;", "3. document.getId(“geek”)=”I am a Geek”;", "4. document.getElementById(“geek”).innerHTML=I am a Geek;"], "2. document.getElementById(“geek”).innerHTML=”I am a Geek”;"),
    new Question("Which of the following is the correct syntax to display “GeeksforGeeks” in an alert box using JavaScript?", ["1. alertbox(“GeeksforGeeks”);", "2. msg(“GeeksforGeeks”);","3. msgbox(“GeeksforGeeks”);", "4. alert(“GeeksforGeeks”);"], "4. alert(“GeeksforGeeks”);"),
    new Question("What is the correct syntax for referring to an external script called “geek.js”?", [`1. script src=”geek.js"`, `2. script href=”geek.js”`, `3. script ref=”geek.js”`, `4. script name=”geek.js”`], `1. script src=”geek.js"`),
    new Question("Predict the output of the following JavaScript code.", ["1. 16", "2. Compilation Error", "3. 88", "4. Run Time Error"], "3. 88")
];

// creates quiz
var quiz = new Quiz(questions);

//starts timer
countdown();

// displays and starts the quiz
populate();