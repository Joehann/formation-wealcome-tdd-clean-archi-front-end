import {QuestionGateway} from "../../../core-logic/gateways/questionGateway.ts";
import {Question} from "../../../core-logic/use-cases/question-retrieval/question.ts";

export class QuestionGatewayStub implements QuestionGateway {

    private _question: Question | null = null;
    private _currentValidation: Record<string, boolean> = {};

    async validate(givenAnswer: string): Promise<boolean> {
        return this._currentValidation[givenAnswer];
    }

    async retrieveQuestion(): Promise<Question> {
        return this._question!;
    }

    set currentValidation(value: Record<string, boolean>) {
        this._currentValidation = value;
    }

    set question(value: Question) {
        this._question = value;
    }
}
