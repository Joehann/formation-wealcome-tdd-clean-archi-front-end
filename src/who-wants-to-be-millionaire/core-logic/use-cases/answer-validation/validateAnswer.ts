import {QuestionGateway} from "../../gateways/questionGateway.ts";

export const validateAnswer = (questionGateway: QuestionGateway) =>
    async (givenAnswer: string) => {
        return questionGateway.validate(givenAnswer);
    }
