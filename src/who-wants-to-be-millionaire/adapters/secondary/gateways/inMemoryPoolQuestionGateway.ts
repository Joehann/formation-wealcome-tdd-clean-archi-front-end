import {QuestionGateway} from "../../../core-logic/gateways/questionGateway.ts";
import {AnswerLetter, Question} from "../../../core-logic/use-cases/question-retrieval/question.ts";
import {PoolQuestionsPicker} from "./poolQuestionsPicker.ts";

export class InMemoryPoolQuestionGateway implements QuestionGateway {


    constructor(private _pool: Record<Question['id'], Question>,
                private _answers: Record<Question['id'], AnswerLetter>,
                private _poolQuestionsPicker: PoolQuestionsPicker) {
    }

    async retrieveQuestion(): Promise<Question> {
        const question =
            await this._poolQuestionsPicker.pickOne();
        delete this._pool[question.id];
        return question;
    }

    async validate(questionId: Question['id'], givenAnswer: AnswerLetter): Promise<boolean> {
        return givenAnswer === this._answers[questionId];
    }

}
