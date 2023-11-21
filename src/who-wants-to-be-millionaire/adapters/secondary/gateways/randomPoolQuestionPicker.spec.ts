import {Question} from "../../../core-logic/use-cases/question-retrieval/question.ts";
import {PoolQuestionsPicker} from "./poolQuestionsPicker.ts";
import {RandomPoolQuestionPicker} from "./randomPoolQuestionPicker.ts";

describe('RandomPoolQuestionPicker', () => {

    let poolGateway: PoolQuestionsPicker;
    let pool: Record<Question['id'], Question>;

    beforeEach(() => {
        pool = {};
        poolGateway = new RandomPoolQuestionPicker(pool);
    });

    it('should pick a random question from the pool', async () => {
        pool['123abc'] = aQuestion;
        expect(await poolGateway.pickOne()).toEqual(aQuestion);
    });

    const aQuestion = {
        id: '123abc',
        label: 'What is the capital of France?',
        possibleAnswers: {
            A: 'Paris',
            B: 'London',
            C: 'Berlin',
            D: 'Madrid'
        }
    }
});
