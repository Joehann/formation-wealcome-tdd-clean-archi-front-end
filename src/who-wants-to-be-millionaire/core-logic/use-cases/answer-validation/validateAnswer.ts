import {QuestionGateway} from "../../gateways/questionGateway.ts";

export type Pyramid = {
    steps: number[];
    currentStep: number;
}

export const validateAnswer = (questionGateway: QuestionGateway, pyramid: Pyramid) =>
    async (givenAnswer: string) => {
        return questionGateway.validate(givenAnswer);
    }
