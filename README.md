# HTML5 Quiz App

A simple, responsive multiple-choice quiz application built with HTML5, CSS3, and JavaScript.

## Features

- Multiple-choice questions with support for multiple correct answers
- Progress bar to track quiz completion
- Results page showing score and correct answers
- Detailed explanations for each question
- Responsive design that works on desktop and mobile devices

## How to Use

1. Open `index.html` in your web browser to start the quiz
2. Select your answers for each question (you can select multiple options if needed)
3. Click "Next Question" to move to the next question
4. After completing all questions, you'll see your results and explanations

## Customizing Quiz Questions

To customize the quiz questions, edit the `quiz-data.json` file. Each question object should have the following structure:

```json
{
  "id": 1,
  "question": "Your question text here?",
  "choices": [
    "Choice 1",
    "Choice 2",
    "Choice 3",
    "Choice 4"
  ],
  "correctAnswers": [0, 2],
  "description": "Explanation about the correct answers."
}
```

- `id`: Unique identifier for the question
- `question`: The question text
- `choices`: Array of possible answers (up to 4)
- `correctAnswers`: Array of indices for the correct choices (0-based)
- `description`: Explanation that will be shown after the quiz

## Project Structure

```
quiz-app/
├── css/
│   └── styles.css
├── js/
│   ├── quiz.js
│   └── results.js
├── quiz-data.json
├── index.html
├── results.html
└── README.md
```

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Local Storage API for persisting quiz results between pages
