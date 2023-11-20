import {expect} from 'vitest'
import {QuestionGatewayStub} from "../../gateways/questionGatewayStub.ts";
import {Pyramid, validateAnswer} from "./validateAnswer.ts";

describe('Validate Answer', () => {

    let questionGateway: QuestionGatewayStub;
    let _validateAnswer: ReturnType<typeof validateAnswer>;

    beforeEach(() => {
        questionGateway = new QuestionGatewayStub();
        _validateAnswer = validateAnswer(questionGateway);
        questionGateway.currentValidation = {A: true};
    });

    it('A correct given answer should end up with a successful validation', async () => {
        const pyramid = {steps: [0, 10], currentStep: 0};
        const validation = await _validateAnswer(pyramid)('A');
        expect(validation).toBe(true);
    });

    it.each`
        initialPyramid | givenAnswer | expectedCurrentStep
         ${{steps: [0, 10], currentStep: 0}} | ${'A'} | ${10}
         ${{steps: [10, 20], currentStep: 10}} | ${'A'} |${20}
         ${{steps: [0, 10], currentStep: 0}} | ${'B'} |${0}
         ${{steps: [10, 20, 30], currentStep: 20}} | ${'B'} |${10}
    `('A correct given answer should increase the pyramid by one step', async (
        {initialPyramid, givenAnswer, expectedCurrentStep}
    ) => {
        // WHEN - ACT
        await _validateAnswer(initialPyramid)(givenAnswer);
        // THEN - ASSERT
        expect(initialPyramid).toEqual({
            ...initialPyramid,
            currentStep: expectedCurrentStep
        });
    });

});
