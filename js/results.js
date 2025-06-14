// DOM Elements
const resultsContainer = document.getElementById('results-container');
const resultsSummary = document.getElementById('results-summary');
const reviewAnswers = document.getElementById('review-answers');

// Load results when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Retrieve quiz data and user answers from local storage
    const quizData = JSON.parse(localStorage.getItem('quizData'));
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers'));
    
    // Check if data exists
    if (!quizData || !userAnswers) {
        resultsContainer.innerHTML = `
            <p class="error">No quiz results found. Please take the quiz first.</p>
            <a href="index.html" class="home-link">Take the Quiz</a>
        `;
        return;
    }
    
    // Display results
    displayResults(quizData, userAnswers);
});

// Display quiz results
function displayResults(quizData, userAnswers) {
    // Calculate score
    const { score, totalQuestions, correctQuestions } = calculateScore(quizData, userAnswers);
    
    // Display summary
    displaySummary(score, totalQuestions, correctQuestions);
    
    // Display review of all questions and answers
    displayReview(quizData, userAnswers);
}

// Calculate the score
function calculateScore(quizData, userAnswers) {
    let correctQuestions = 0;
    
    // Check each question
    quizData.forEach((question, index) => {
        const correctAnswers = new Set(question.correctAnswers);
        const userAnswersSet = new Set(userAnswers[index]);
        
        // Check if user answers match correct answers exactly
        if (
            correctAnswers.size === userAnswersSet.size &&
            [...correctAnswers].every(answer => userAnswersSet.has(answer))
        ) {
            correctQuestions++;
        }
    });
    
    const totalQuestions = quizData.length;
    const score = Math.round((correctQuestions / totalQuestions) * 100);
    
    return { score, totalQuestions, correctQuestions };
}

// Display the results summary
function displaySummary(score, totalQuestions, correctQuestions) {
    let message = '';
    
    // Determine message based on score
    if (score >= 90) {
        message = 'Excellent job!';
    } else if (score >= 70) {
        message = 'Good work!';
    } else if (score >= 50) {
        message = 'Nice effort!';
    } else {
        message = 'Keep practicing!';
    }
    
    // Create the summary HTML
    resultsSummary.innerHTML = `
        <h2>${message}</h2>
        <p class="score">${score}%</p>
        <p>You got ${correctQuestions} out of ${totalQuestions} questions correct.</p>
    `;
}

// Display a review of all questions and answers
function displayReview(quizData, userAnswers) {
    // Clear previous content
    reviewAnswers.innerHTML = '<h2>Review Your Answers</h2>';
    
    // Go through each question
    quizData.forEach((question, questionIndex) => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        
        // Add question
        const questionElement = document.createElement('div');
        questionElement.className = 'review-question';
        questionElement.textContent = `Question ${questionIndex + 1}: ${question.question}`;
        reviewItem.appendChild(questionElement);
        
        // Add choices
        const choicesElement = document.createElement('div');
        choicesElement.className = 'review-choices';
        
        // Check each choice
        question.choices.forEach((choice, choiceIndex) => {
            const choiceElement = document.createElement('div');
            choiceElement.className = 'review-choice';
            
            // Determine if this choice was correct/incorrect
            const isCorrect = question.correctAnswers.includes(choiceIndex);
            const wasSelected = userAnswers[questionIndex].includes(choiceIndex);
            
            if (wasSelected) {
                choiceElement.classList.add(isCorrect ? 'correct' : 'incorrect');
            }
            
            // Add choice text with appropriate markings
            let choiceText = `${choice}`;
            if (isCorrect) {
                choiceText += ' ✓';
            }
            if (wasSelected && !isCorrect) {
                choiceText += ' ✗';
            }
            
            choiceElement.textContent = choiceText;
            choicesElement.appendChild(choiceElement);
        });
        
        reviewItem.appendChild(choicesElement);
        
        // Add explanation
        const explanationElement = document.createElement('div');
        explanationElement.className = 'explanation';
        explanationElement.textContent = question.description;
        reviewItem.appendChild(explanationElement);
        
        // Add to review section
        reviewAnswers.appendChild(reviewItem);
    });
}
