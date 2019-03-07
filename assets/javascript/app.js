let intervalId;

const myQuestions = [
    {
        question: "Which of these movies did not debut in 1997?",
        answers: {
            a: "Liar Liar",
            b: "Men in Black",
            c: "Toy Story 2",
            d: "Titanic",
        },
        correctAnswer: "c"
    },
    {
        question: "Which of these movies was released in 1983?",
        answers: {
            a: "Cocoon",
            b: "Arthur",
            c: "Flashdance",
            d: "Big",
        },
        correctAnswer: "c"
    },
    {
        question: "Which of these movies did not debut in 1991?",
        answers: {
            a: "Carrie",
            b: "I.T.",
            c: "The Green Mile",
            d: "Under The Dome",
        },
        correctAnswer: "a"
    },
    {
        question: "Which of these movies did not debut in 1991?",
        answers: {
            a: "Speed",
            b: "The Silence of the Lambs",
            c: "Beauty and the Beast",
            d: "Hook",
        },
        correctAnswer: "a"
    },
    {
        question: "Which movie did not come out in 1976?",
        answers: {
            a: "The Omen",
            b: "Paper Moon",
            c: "Rocky",
            d: "Taxi Driver",
        },
        correctAnswer: "b"
    },
    {
        question: "Which of these movies was not released in 1957?",
        answers: {
            a: "12 Angry Men",
            b: "The Bridge on the River Kwai",
            c: "North by Northwest",
            d: "The Three Faces of Eve",
        },
        correctAnswer: "c"
    },
    {
        question: "Which movie did not debut in 1982?",
        answers: {
            a: "Back to the Future",
            b: "E.T. The Extra-Terrestrial",
            c: "Poltergeist",
            d: "Porky's",
        },
        correctAnswer: "a"
    },
    {
        question: "Which of these movies did not debut in 1988?",
        answers: {
            a: "Die Hard",
            b: "Who Framed Roger Rabbit",
            c: "Beetlejuice",
            d: "Top Gun",
        },
        correctAnswer: "d"
    },
];

function buildQuiz() {
    const output = [];

    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = [];

        for (const letter in currentQuestion.answers) {
            answers.push(`
                <label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} : ${currentQuestion.answers[letter]}
                </label>
            `);
        }

        output.push(`
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
        `);
    });

    $("#questionsContainer").html(output.join(""));
}

function showResults() {
    const answerContainers = $("#questionsContainer .answers");
    let numberCorrect = 0;
    let numberWrong = 0;
    let numberUnanswered = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = $(answerContainers[questionNumber]);
        const userAnswer = ($(answerContainer).find(`input[name=question${questionNumber}]:checked`)[0] || {}).value;
        if (!userAnswer) {
            numberUnanswered++;
            answerContainer.css("color", "red");
        } else if (userAnswer === currentQuestion.correctAnswer) {
            numberCorrect++;
            answerContainer.css("color", "lightgreen");
        } else {
            numberWrong++;
            answerContainer.css("color", "red");
        }
    });

    $("#resultsContainer").html(`
        <div>${numberCorrect} correct</div>
        <div>${numberWrong} incorrect</div>
        <div>${numberUnanswered} unanswered</div>
    `);
}

function startTimer(duration, display) {
    let timer = duration;
    intervalId = setInterval(() => {
        let minutes = parseInt(timer / 60, 10)
        let seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(`${minutes}:${seconds}`);

        if (--timer < 0) {
            stopTimer();
            showResults();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(intervalId);
}

$(document).ready(() => {
    $("#startButton").on("click", () => {
        $("#startContainer, #quizContainer").toggle();
        const timerDuration = 60 * 2; // two minutes
        const display = $("#time");
        startTimer(timerDuration, display);
        buildQuiz();
    });
    $("#submitButton").on("click", () => {
        stopTimer();
        showResults();
    });
});
