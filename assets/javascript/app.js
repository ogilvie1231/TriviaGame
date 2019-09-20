$(document).ready(function () {

    $('#questionDisplay').hide();
    $('#timeRemaining').hide();
    $('#timer').hide();
    $('#questionBox').hide();
    $('#endPage').hide();

    // Creating a game object
    
    var game = {

        // Creating a time to count down form
        timeRemaining: 60,

        // using set time below makes the timer run immediately but clearInterval works 
        setTime: setInterval(function () { game.countDown() }, 1000),

        // Starting the timer, hiding the start page
        startTimer: function () {

            // using setTime below only runs when I start but clearInterval doesn't work
            // setTime = setInterval(function () { game.countDown() }, 1000),

                game.timeRemaining = 60,
                // targeting timer and putting it in the dom
                $('#timer').append('Time Remaining: ' + game.timeRemaining);

            // clearing questions
            $('#questionBox').empty();
            $('#correctAns').empty();
            $('#incorrectAns').empty();
            $('#unanswered').empty();
            $('#questionBox').show();
            $('#endPage').hide();
            $('#instructions').hide();

            trivia.displayQuestions();

            if (game.timeRemaining <= 0) {
             
                $('#doneButton').hide();
                trivia.checkAnswers();
            }

            $('#doneButton').show();
            $('#timer').show();

        },

        countDown: function () {
           
            // Setting timer to minus 1 each time function is called
            game.timeRemaining--;

            $('#timer').empty();
            // displaying new count in timer
            $('#timer').append('Time Remaining: ', game.timeRemaining);

            // creating an if statement to stop timer at 0.
            if (game.timeRemaining <= 0) {

                trivia.checkAnswers();
                // clearing out the timer at the stop of the game
                $('#timer').empty();
            }

        },

        // creating a function to stop the timer
        stopTimer: function () {

            clearInterval(this.setTime);

            $('#questionBox').hide();
        },

        //  hiding the questions and displaying the end page
        showEnd: function (numCorrect, numIncorrect, numUnanswered) {

            // displaying endPage
            $('#endPage').show();

            // clearing questions
            $('#questionBox').empty();

            // clearing and hiding timer
            $('#timer').empty();
            $('#timer').hide();

            // displaying the amount of correct answers
            $('#correctAns').html('Correct Answers: ' + numCorrect);

            //  displaying the amount of incorrect answers
            $('#incorrectAns').text('Incorrect Answers: ' + numIncorrect);

            // displaying the amount of questions unanswered
            $('#unanswered').text('Unanswered Questions: ' + numUnanswered);
        }
    }

    var trivia = {

        // creating a function to display questions
        displayQuestions: function () {

            // creating a containter for question box
            var divContainer = $('#questionBox');

            // creating answer group
            var answerGroup = $('.formCheck');

            // adding content to divContainer
            divContainer.append('<h2>Answer the following questions:</h2>');

            // creating a for loop to move through question bank
            for (var i = 0; i < questionBank.length; i++) {

                // adding HTML to divContainer
                divContainer.append('<div id="question">' + questionBank[i].question + '</div>');

                // creating variables for each question
                var answer0 = questionBank[i].answers[0];
                var answer1 = questionBank[i].answers[1];
                var answer2 = questionBank[i].answers[2];
                var answer3 = questionBank[i].answers[3];

                // creating a form for questions
                divContainer.append('<div id="questionDisplay class="formCheck"><input class="formCheckInput" type="radio" name="radioGroup' + i + '" id="radio' + i + '"><label class="formCheckLabel" id="radio' + i + 'label" for="radio' + i + '">' + answer0 + '</label></div>');
                divContainer.append('<div id="questionDisplay class="formCheck"><input class="formCheckInput" type="radio" name="radioGroup' + i + '" id="radio' + i + '"><label class="formCheckLabel" id="radio' + i + 'label" for="radio' + i + '">' + answer1 + '</label></div>');
                divContainer.append('<div id="questionDisplay class="formCheck"><input class="formCheckInput" type="radio" name="radioGroup' + i + '" id="radio' + i + '"><label class="formCheckLabel" id="radio' + i + 'label" for="radio' + i + '">' + answer2 + '</label></div>');
                divContainer.append('<div id="questionDisplay class="formCheck"><input class="formCheckInput" type="radio" name="radioGroup' + i + '" id="radio' + i + '"><label class="formCheckLabel" id="radio' + i + 'label" for="radio' + i + '">' + answer3 + '</label></div><br>');
            }

        },

        // creating a function to check the answers
        checkAnswers: function () {
            var correctAns;
            var userAnswer;
            var numCorrect = 0;
            var numIncorrect = 0;
            var numUnanswered = 0;

            // creating a for loop to check answers and add to score
            for (var i = 0; i < questionBank.length; i++) {
                correctAns = questionBank[i].correct;
                userAnswer = $('input[id=radio' + i + ']:checked + label').text();

                // creating an if statement to add count to correct, incorrect and unanswered
                if (userAnswer === correctAns) {
                    numCorrect++;
                }
                else if (userAnswer === "") {
                    numUnanswered++;
                }
                else if (userAnswer !== correctAns) {
                    {
                        numIncorrect++;
                    }
                }
            }
            game.showEnd(numCorrect, numIncorrect, numUnanswered);
            game.stopTimer();

        },
    }
   
    //  creating an array to hold questions and answer choices
    var questionBank = [
        {
            // Creating question
            question: "Who is Data's creator",
            // creating an array of answer choices
            answers: ['Reginald Barclay', 'Guinan', 'Wesley Crusher', 'Noonien Soong'],
            // setting correct answer
            correct: 'Noonien Soong'
        },

        {
            question: "What is a Q?",
            answers: ['An omnipotent race', 'A class of starship', 'A ranking', 'A medical device'],
            correct: 'An omnipotent race'
        },

        {
            question: "What is the name given to the Borg who was saved by Dr. Crusher?",
            answers: ['Daimen Tok', 'Lore', 'Hugh', 'Alexander'],
            correct: 'Hugh'
        },

        {
            question: "What race is Worf?",
            answers: ['Cardassian', 'Bajoran', 'Ferengi', 'Klingon'],
            correct: 'Noonien Soong'
        },

        {
            question: "Who did the borg name locutus",
            answers: ['Geordi la forge', 'Commander Riker', 'Captain Picard', 'Deanna Troi'],
            correct: 'Captain Picard'
        },

        {
            question: "What was the name given to Data's daugher",
            answers: ['Lal', 'Dot', 'Troi', 'Sandra'],
            correct: 'Lal'
        },

    ]
    $('#doneButton').on('click', trivia.checkAnswers);
    $('#startButton').on('click', game.startTimer);
    $('#doneButton').hide();
    $('#scores').hide();



});







