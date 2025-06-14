# HTML5 Quiz App

An interactive HTML5 quiz application featuring multiple-choice questions with support for multiple correct answers. Track your progress, test your knowledge, and receive detailed explanations after completion. Clean, responsive design works on all devices with a modern browser.

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
quiz-html5/
├── css/
│   └── styles.css
├── js/
│   ├── quiz.js
│   └── results.js
├── quiz-data.json
├── index.html
├── results.html
├── LICENSE.txt
├── .gitignore
└── README.md
```

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Local Storage API for persisting quiz results between pages

## Installation

No installation required! Simply:

1. Clone or download this repository
2. Open `index.html` in any modern web browser

## Demo

To experience the quiz app:
1. Open `index.html` in your browser
2. Answer the questions by clicking on multiple choices if needed
3. Navigate through all questions
4. View your final score and explanations

## License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.

Copyright (c) 2025

## Author

Created on June 14, 2025
