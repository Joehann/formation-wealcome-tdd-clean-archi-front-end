import './index.css'
import ReactDOM from 'react-dom/client';
import {UseCasesContext} from "./who-wants-to-be-millionaire/adapters/primary/react/useCasesInjections.tsx";
import React from 'react';
import App from "./who-wants-to-be-millionaire/adapters/primary/react/components/App.tsx";
import {validateAnswer} from "./who-wants-to-be-millionaire/core-logic/use-cases/answer-validation/validateAnswer.ts";
import {
    retrieveQuestion
} from "./who-wants-to-be-millionaire/core-logic/use-cases/question-retrieval/retrieveQuestion.ts";
import {
    InMemoryPoolQuestionGateway
} from "./who-wants-to-be-millionaire/adapters/secondary/gateways/inMemoryPoolQuestionGateway.ts";
import {
    AnswerLetter,
    Question
} from "./who-wants-to-be-millionaire/core-logic/use-cases/question-retrieval/question.ts";
import {
    RandomPoolQuestionPicker
} from "./who-wants-to-be-millionaire/adapters/secondary/gateways/randomPoolQuestionPicker.ts";


const pool: Record<Question['id'], Question> = {
    "q1": {
        "id": "q1",
        "label": "Which company developed the Python programming language?",
        "possibleAnswers": {
            "A": "Microsoft",
            "B": "Google",
            "C": "Apple",
            "D": "Guido van Rossum"
        }
    },
    "q2": {
        "id": "q2",
        "label": "What does 'HTTP' stand for?",
        "possibleAnswers": {
            "A": "HyperText Transfer Protocol",
            "B": "High Transfer Text Protocol",
            "C": "HyperText Transmission Protocol",
            "D": "High Text Transfer Protocol"
        }
    },
    "q3": {
        "id": "q3",
        "label": "What is the main function of a computer's CPU?",
        "possibleAnswers": {
            "A": "Graphics rendering",
            "B": "Data storage",
            "C": "Processing instructions",
            "D": "Power supply"
        }
    },
    "q4": {
        "id": "q4",
        "label": "Which of the following is a non-volatile memory?",
        "possibleAnswers": {
            "A": "RAM",
            "B": "Cache",
            "C": "SSD",
            "D": "Registers"
        }
    },
    "q5": {
        "id": "q5",
        "label": "What is the main advantage of fiber optic cabling over copper cabling?",
        "possibleAnswers": {
            "A": "Cheaper",
            "B": "Higher bandwidth",
            "C": "Easier to install",
            "D": "More durable"
        }
    }
}

const answers: Record<Question['id'], AnswerLetter> = {
    'q1': 'D',
    'q2': 'A',
    'q3': 'C',
    'q4': 'C',
    'q5': 'B'
}

const questionGateway = new InMemoryPoolQuestionGateway(pool, answers,
    new RandomPoolQuestionPicker(pool));


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <UseCasesContext.Provider value={{
            validateAnswer: validateAnswer(questionGateway),
            retrieveQuestion: retrieveQuestion(questionGateway)
        }}>
            <App/>
        </UseCasesContext.Provider>
    </React.StrictMode>
)
