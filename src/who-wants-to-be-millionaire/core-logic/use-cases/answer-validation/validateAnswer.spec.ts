import {expect} from 'vitest'
import {QuestionGatewayStub} from "../../gateways/questionGatewayStub.ts";
import {validateAnswer} from "./validateAnswer.ts";

describe('Validate Answer', () => {

    let questionGateway: QuestionGatewayStub;
    let _validateAnswer: ReturnType<typeof validateAnswer>;

    beforeEach(() => {
        questionGateway = new QuestionGatewayStub();
        _validateAnswer = validateAnswer(questionGateway);
    });

    it('A correct given answer should end up with a successful validation', async () => {
        questionGateway.currentValidation = {A: true};
        await expectValidation('A', true);
    });

    const expectValidation = async (givenAnswer: string, expectedValidation: boolean)=>  {
        expect(await _validateAnswer(givenAnswer)).toBe(expectedValidation);
    }

});
