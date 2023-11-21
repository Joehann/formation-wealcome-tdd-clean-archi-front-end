import {InMemoryPoolQuestionGateway} from "./inMemoryPoolQuestionGateway.ts";
import {AnswerLetter, Question} from "../../../core-logic/use-cases/question-retrieval/question.ts";
import {DeterministicPoolQuestionPickerStub} from "./deterministicPoolQuestionPickerStub.ts";

describe('InMemoryPoolQuestionGateway', () => {

    let poolGateway: InMemoryPoolQuestionGateway;
    let pool: Record<Question['id'], Question>;
    let poolQuestionsPicker: DeterministicPoolQuestionPickerStub;
    const answers: Record<Question['id'], AnswerLetter> = {
        '123abc': 'A',
        '456def': 'B'
    };

    beforeEach(() => {
        pool = {};
        poolQuestionsPicker = new DeterministicPoolQuestionPickerStub(pool);
        poolGateway = new InMemoryPoolQuestionGateway(pool, answers,
            poolQuestionsPicker);
        pool['123abc'] = aQuestion;
        pool['456def'] = {...aQuestion, id: '456def'};
    });

    describe('Pool of several questions', () => {

        it.each`
            nextQuestionId | remainingQuestionInThePool 
              ${'123abc'} | ${'456def'}
        `('should pop the current question', async (
            {nextQuestionId, remainingQuestionInThePool}
        ) => {
            poolQuestionsPicker.nextQuestionId = nextQuestionId;
            expect(await poolGateway.retrieveQuestion()).toEqual(aQuestion);
            expect(pool).toEqual({[remainingQuestionInThePool]: pool[remainingQuestionInThePool]});
        });

        it('should validate the current question', async () => {
            expect(await poolGateway.validate('123abc', 'A')).toBeTruthy();
            expect(await poolGateway.validate('456def', 'A')).toBeFalsy();
        });
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
