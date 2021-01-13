function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
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
    var gameOverHTML = "<h1>All Done!</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    gameOverHTML += "<p>Enter Initials: " + `<input type = "text" id="textScore" />`  + `<button type="button" id="buttonScore" onclick="finalScore()">Submit</button>`+ "</p>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

function finalScore() {
    /* var initialInput = document.querySelector('#textScore').value;
    var finalScore = document.querySelector('#finalScore');
    localStorage.setItem('lastInitial', initialInput);
    finalScore.textContent = localStorage.getItem('lastInitial'); */
    
    var highScoreHTML = "<h1>HighScores</h1>";
    highScoreHTML += `<p><span id="finalScore"></span></p>`;
    highScoreHTML += `<button type="button" id="buttonScore" onclick="goBack()">Go Back</button>` + "   " + `<button type="button" id="buttonScore" onclick="clearScore()">Clear Highscores</button>`;
    var element = document.getElementById("quiz");
    element.innerHTML = highScoreHTML;
}

function clearScore() {
    finalScore.textContent = "";
}

function goBack() {
    populate();
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

// display quiz
populate();