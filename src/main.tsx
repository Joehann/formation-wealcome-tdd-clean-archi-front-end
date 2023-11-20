import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
    Pyramid,
    validateAnswer
} from "./who-wants-to-be-millionaire/core-logic/use-cases/answer-validation/validateAnswer.ts";
import {QuestionGatewayStub} from "./who-wants-to-be-millionaire/core-logic/gateways/questionGatewayStub.ts";
import {App} from "./who-wants-to-be-millionaire/App.tsx";

const questionGateway = new QuestionGatewayStub();
questionGateway.currentValidation = {A: false, B: true, C: false, D: false};


export type GameContext = {
    pyramid: Pyramid;
} | null;

export type UseCasesDef = {
    validateAnswer: ReturnType<typeof validateAnswer>;
}

const defaultUseCasesContextValue: UseCasesDef = {
    validateAnswer: validateAnswer(questionGateway)
};

export const UseCasesContext = React.createContext<UseCasesDef>(defaultUseCasesContextValue);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <UseCasesContext.Provider value={defaultUseCasesContextValue}>
            <App />
        </UseCasesContext.Provider>
    </React.StrictMode>
)
