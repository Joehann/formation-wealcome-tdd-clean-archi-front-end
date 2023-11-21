import {Question} from "../use-cases/question-retrieval/question.ts";

export interface QuestionGateway {
    validate(givenAnswer: string): Promise<boolean>;
    retrieveQuestion(): Promise<Question>;
}
