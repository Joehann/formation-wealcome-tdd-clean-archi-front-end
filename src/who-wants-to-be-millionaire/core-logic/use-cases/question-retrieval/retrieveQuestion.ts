import {QuestionGateway} from "../../gateways/questionGateway.ts";

export const retrieveQuestion =
    (questionGateway: QuestionGateway) => async () => {
    return questionGateway.retrieveQuestion();
};
