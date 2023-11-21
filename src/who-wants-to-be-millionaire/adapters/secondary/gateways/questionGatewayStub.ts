import {QuestionGateway} from "../../../core-logic/gateways/questionGateway.ts";
import {AnswerLetter, Question} from "../../../core-logic/use-cases/question-retrieval/question.ts";

export class QuestionGatewayStub implements QuestionGateway {

    private _question: Question | null = null;
    private _currentValidation: Record<Question['id'], AnswerLetter> = {} as Record<Question['id'], AnswerLetter>;

    async validate(questionId: Question['id'], givenAnswer: AnswerLetter): Promise<boolean> {
        const answer = this._currentValidation[questionId];
        return givenAnswer === answer;
    }

    async retrieveQuestion(): Promise<Question> {
        return this._question!;
    }

    set currentValidation(value: Record<Question['id'], AnswerLetter>) {
        this._currentValidation = value;
    }

    set question(value: Question) {
        this._question = value;
    }
}
