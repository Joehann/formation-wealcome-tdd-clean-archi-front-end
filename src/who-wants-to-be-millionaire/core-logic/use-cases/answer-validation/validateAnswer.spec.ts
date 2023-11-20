import {expect} from 'vitest'
import {QuestionGatewayStub} from "../../gateways/questionGatewayStub.ts";
import {validateAnswer} from "./validateAnswer.ts";

describe('Validate Answer', () => {

    let questionGateway: QuestionGatewayStub;
    let _validateAnswer: ReturnType<typeof validateAnswer>;
    const pyramid = {steps: [0, 10], currentStep: 0};

    beforeEach(() => {
        questionGateway = new QuestionGatewayStub();
        _validateAnswer = validateAnswer(questionGateway, pyramid);
    });

    it('A correct given answer should end up with a successful validation', async () => {
        questionGateway.currentValidation = {A: true};
        const validation = await _validateAnswer('A');
        expect(validation).toBe(true);
    });

    it('A correct given answer should increase the pyramid by one step', async () => {
        // GIVEN - ARRANGE
        questionGateway.currentValidation = {A: true};
        const pyramid = {
            steps: [0, 10],
            currentStep: 0
        };
        // WHEN - ACT
        await _validateAnswer('A');
        // THEN - ASSERT
        expect(pyramid).toEqual({
            steps: [0, 10],
            currentStep: 10
        });
    });

});
