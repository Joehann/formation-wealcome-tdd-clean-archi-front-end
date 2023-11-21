import {QuestionGatewayStub} from "../../secondary/gateways/questionGatewayStub.ts";
import {validateAnswer} from "../../../core-logic/use-cases/answer-validation/validateAnswer.ts";
import React from "react";
import {retrieveQuestion} from "../../../core-logic/use-cases/question-retrieval/retrieveQuestion.ts";

const questionGateway = new QuestionGatewayStub();
questionGateway.currentValidation = {A: true, B: false, C: false, D: false};
questionGateway.question = {
    id: '123abc',
    label: 'What is DDD in programming',
    possibleAnswers: {
        A: 'Domain-Driven Design',
        B: 'Duck Driven Development',
        C: 'Duck Driven Design',
        D: 'Domain-Driven Development'
    }
}

export type UseCasesDef = {
    validateAnswer: ReturnType<typeof validateAnswer>;
    retrieveQuestion: ReturnType<typeof retrieveQuestion>;
}

export const defaultUseCasesContextValue: UseCasesDef = {
    validateAnswer: validateAnswer(questionGateway),
    retrieveQuestion: retrieveQuestion(questionGateway)
};
export const UseCasesContext = React.createContext<UseCasesDef>(defaultUseCasesContextValue);
