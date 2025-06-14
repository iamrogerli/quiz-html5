// Global variables
let quizData = [];
let currentQuestionIndex = 0;
let userAnswers = [];

// DOM Elements
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const nextButton = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');

// Fetch quiz data from JSON file
async function fetchQuizData() {
    try {
        const response = await fetch('quiz-data.json');
        if (!response.ok) {
            throw new Error('Failed to fetch quiz data');
        }
        quizData = await response.json();
        initializeQuiz();
    } catch (error) {
        console.error('Error loading quiz data:', error);
        quizContainer.innerHTML = `<p class="error">Error loading quiz data. Please try again later.</p>`;
    }
}

// Initialize the quiz
function initializeQuiz() {
    // Initialize user answers array with empty arrays for each question
    userAnswers = quizData.map(() => []);
    
    // Display the first question
    displayQuestion();
    
    // Set up event listeners
    nextButton.addEventListener('click', handleNextButtonClick);
}

// Display the current question
function displayQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    
    // Update progress bar
    const progressPercentage = (currentQuestionIndex / quizData.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    
    // Set question text
    questionElement.textContent = currentQuestion.question;
    
    // Clear previous choices
    choicesElement.innerHTML = '';
    
    // Add new choices
    currentQuestion.choices.forEach((choice, index) => {
        const li = document.createElement('li');
        li.className = 'choice-item';
        if (userAnswers[currentQuestionIndex].includes(index)) {
            li.classList.add('selected');
        }
        li.dataset.index = index;
        li.textContent = choice;
        
        // Add click event
        li.addEventListener('click', () => {
            toggleChoice(li, index);
        });
        
        choicesElement.appendChild(li);
    });
    
    // Update next button text on last question
    if (currentQuestionIndex === quizData.length - 1) {
        nextButton.textContent = 'Finish Quiz';
    } else {
        nextButton.textContent = 'Next Question';
    }
}

// Toggle a choice selection
function toggleChoice(choiceElement, choiceIndex) {
    // Toggle the 'selected' class
    choiceElement.classList.toggle('selected');
    
    // Update the user answers array
    if (choiceElement.classList.contains('selected')) {
        // Add the choice index if it's not already in the array
        if (!userAnswers[currentQuestionIndex].includes(choiceIndex)) {
            userAnswers[currentQuestionIndex].push(choiceIndex);
        }
    } else {
        // Remove the choice index if it's in the array
        userAnswers[currentQuestionIndex] = userAnswers[currentQuestionIndex].filter(
            index => index !== choiceIndex
        );
    }
}

// Handle next button click
function handleNextButtonClick() {
    // Move to the next question or finish the quiz
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
        window.scrollTo(0, 0);
    } else {
        finishQuiz();
    }
}

// Finish the quiz and show results
function finishQuiz() {
    // Store results in local storage
    localStorage.setItem('quizData', JSON.stringify(quizData));
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    
    // Redirect to results page
    window.location.href = 'results.html';
}

// Start the quiz when the page loads
document.addEventListener('DOMContentLoaded', fetchQuizData);
