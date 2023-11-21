import {retrieveQuestion} from "./retrieveQuestion.ts";
import {QuestionGatewayStub} from "../../../adapters/secondary/gateways/questionGatewayStub.ts";
import {Question} from "./question.ts";

describe('Retrieve Question', () => {

    let questionGateway: QuestionGatewayStub;

    beforeEach(() => {
        questionGateway = new QuestionGatewayStub();
    });

    it('should retrieve the current question', async () => {
        questionGateway.question = aQuestion;
        expect(await retrieveQuestion(questionGateway)()).toEqual({
            id: '123abc',
            label: 'What is the capital of France?',
            possibleAnswers: {
                A: 'Paris',
                B: 'London',
                C: 'Berlin',
                D: 'Madrid'
            }
        });
    });

    const aQuestion: Question = {
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
