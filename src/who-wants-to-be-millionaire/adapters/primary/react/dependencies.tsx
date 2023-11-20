import {QuestionGatewayStub} from "../../secondary/gateways/questionGatewayStub.ts";
import {validateAnswer} from "../../../core-logic/use-cases/answer-validation/validateAnswer.ts";
import React from "react";

const questionGateway = new QuestionGatewayStub();
questionGateway.currentValidation = {A: false, B: true, C: false, D: false};

export type UseCasesDef = {
    validateAnswer: ReturnType<typeof validateAnswer>;
}

export const defaultUseCasesContextValue: UseCasesDef = {
    validateAnswer: validateAnswer(questionGateway)
};
export const UseCasesContext = React.createContext<UseCasesDef>(defaultUseCasesContextValue);
