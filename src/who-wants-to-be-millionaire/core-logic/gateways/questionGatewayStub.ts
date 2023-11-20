import {QuestionGateway} from "./questionGateway.ts";

export class QuestionGatewayStub implements QuestionGateway {

    private _currentValidation: Record<string, boolean> = {};

    async validate(givenAnswer: string): Promise<boolean> {
        return this._currentValidation[givenAnswer];
    }

    set currentValidation(value: Record<string, boolean>) {
        this._currentValidation = value;
    }
}
