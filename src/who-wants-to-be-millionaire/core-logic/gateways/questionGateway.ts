import {AnswerLetter, Question} from "../use-cases/question-retrieval/question.ts";

export interface QuestionGateway {
    validate(questionId: Question['id'], givenAnswer: AnswerLetter): Promise<boolean>;
    retrieveQuestion(): Promise<Question>;
}
