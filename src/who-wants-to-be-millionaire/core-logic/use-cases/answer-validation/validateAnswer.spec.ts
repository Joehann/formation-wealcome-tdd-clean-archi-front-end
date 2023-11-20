import {expect} from 'vitest'
import {QuestionGatewayStub} from "../../gateways/questionGatewayStub.ts";
import {Pyramid, validateAnswer} from "./validateAnswer.ts";

describe('Validate Answer', () => {

    let questionGateway: QuestionGatewayStub;
    let _validateAnswer: ReturnType<typeof validateAnswer>;
    const pyramid = {steps: [0, 10], currentStep: 0};

    beforeEach(() => {
        questionGateway = new QuestionGatewayStub();
        _validateAnswer = validateAnswer(questionGateway, pyramid);
        questionGateway.currentValidation = {A: true};
    });

    it('A correct given answer should end up with a successful validation', async () => {
        const validation = await _validateAnswer('A');
        expect(validation).toBe(true);
    });

    it('A correct given answer should increase the pyramid by one step', async () => {
        // GIVEN - ARRANGE
        const pyramid: Pyramid = {
            steps: [0, 10],
            currentStep: 0
        };
        // WHEN - ACT
        await _validateAnswer('A');
        // THEN - ASSERT
        expect(pyramid).toEqual({
            ...pyramid,
            currentStep: 10
        });
    });

});
