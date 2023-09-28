// basic display you may add more code here.
const shuffledsQuestions = [...questions]; // Create a copy of the shuffledQuestions array
shuffleArray(shuffledsQuestions); // Shuffle the shuffledQuestions

let counter = 0; // Counter to keep track of the current question
let score = 0;
let click = 0;

// Shuffle the array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// set the question and answers to the HTML via DOM
let questionElement = document.getElementById('question');
let questionNumElement = document.getElementById('questionNum');
let ans1Element = document.getElementById('ans1');
let ans2Element = document.getElementById('ans2');
let ans3Element = document.getElementById('ans3');
let ans4Element = document.getElementById('ans4');
let scoreElement = document.getElementById('scoretext');
let nextButton = document.getElementById('next');

// Hide the correct, wrong, and explanation elements initially
let correctElement = document.getElementById('correct');
let wrongElement = document.getElementById('wrong');
let explanationElement = document.getElementById('explanation');
correctElement.style.display = 'none';
wrongElement.style.display = 'none';
explanationElement.style.display = 'none';

nextQuestion();
nextButton.addEventListener('click', nextQuestion);

function nextQuestion() {
    click = 0;
    if (counter < 5) {
        let question = shuffledsQuestions[counter]; // Use shuffledsQuestions
        answers = question.answer;
        explanation = question.explain;
        questionElement.innerHTML = question.question;
        ans1Element.src = answers[0].pic;
        ans2Element.src = answers[1].pic;
        ans3Element.src = answers[2].pic;
        ans4Element.src = answers[3].pic;
        ans1Element.alt = answers[0].id;
        ans2Element.alt = answers[1].id;
        ans3Element.alt = answers[2].id;
        ans4Element.alt = answers[3].id;
        ans1Element.title = answers[0].id;
        ans2Element.title = answers[1].id;
        ans3Element.title = answers[2].id;
        ans4Element.title = answers[3].id;
        counter++;
        // Hide the correct, wrong, and explanation elements when moving to the next question
        correctElement.style.display = 'none';
        wrongElement.style.display = 'none';
        explanationElement.style.display = 'none';
    }
}

function checkAnswer(selectedAnswer) {
    if (click === 1)
        return;
    const question = shuffledsQuestions[counter - 1]; // Get the current question
    const correctAnswers = question.answer.filter(answer => answer.correct);
    const correctAnswerIds = correctAnswers.map(answer => answer.id);

    if (correctAnswerIds.includes(selectedAnswer)) {
        // Correct answer
        score++;
        correctElement.style.display = 'block';
        wrongElement.style.display = 'none';
    } else {
        // Wrong answer
        correctElement.style.display = 'none';
        wrongElement.style.display = 'block';
    }

    click = 1

    // Display the explanation
    explanationElement.innerHTML = question.explain;
    explanationElement.style.display = 'block';

    // Update the score text
    scoreElement.innerHTML = "Score: " + score;
    questionNumElement.innerHTML = `Question ${counter}`;
}

ans1Element.addEventListener('click', () => checkAnswer(ans1Element.alt));
ans2Element.addEventListener('click', () => checkAnswer(ans2Element.alt));
ans3Element.addEventListener('click', () => checkAnswer(ans3Element.alt));
ans4Element.addEventListener('click', () => checkAnswer(ans4Element.alt));