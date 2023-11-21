import {PoolQuestionsPicker} from "./poolQuestionsPicker.ts";
import {Question} from "../../../core-logic/use-cases/question-retrieval/question.ts";

export class DeterministicPoolQuestionPickerStub implements PoolQuestionsPicker {

    private _nextQuestionId: string | null = null;

    constructor(private pool: Record<Question['id'], Question>) {
    }

    async pickOne(): Promise<Question> {
        return this.pool[this._nextQuestionId!];
    }

    set nextQuestionId(value: string | null) {
        this._nextQuestionId = value;
    }
}
