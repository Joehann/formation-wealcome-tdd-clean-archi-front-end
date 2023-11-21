import {PoolQuestionsPicker} from "./poolQuestionsPicker.ts";
import {Question} from "../../../core-logic/use-cases/question-retrieval/question.ts";

export class RandomPoolQuestionPicker implements PoolQuestionsPicker {

    constructor(private pool: Record<Question['id'], Question>) {
    }

    async pickOne(): Promise<Question> {
        const questionIds = Object.keys(this.pool);
        const randomIndex = Math.floor(Math.random() * questionIds.length);
        const randomQuestionId = questionIds[randomIndex];
        return this.pool[randomQuestionId];
    }

}
