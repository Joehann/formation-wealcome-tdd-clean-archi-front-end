import {expect} from 'vitest'
import {QuestionGatewayStub} from "../../../adapters/secondary/gateways/questionGatewayStub.ts";
import {Pyramid, validateAnswer} from "./validateAnswer.ts";

describe('Validate Answer', () => {

    let questionGateway: QuestionGatewayStub;
    let _validateAnswer: ReturnType<typeof validateAnswer>;
    let pyramid: Pyramid;
    let goingToTheNextQuestion: boolean;

    beforeEach(() => {
        questionGateway = new QuestionGatewayStub();
        _validateAnswer = validateAnswer(questionGateway);
        questionGateway.currentValidation = {'123abc': 'A'};
        goingToTheNextQuestion = false;
    });

    const setPyramid = (p: Pyramid) => {
        pyramid.currentStep = p.currentStep;
    }

    const goToNextQuestion = () => {
      goingToTheNextQuestion = true;
    };

    it('A correct given answer should end up with a successful validation', async () => {
        pyramid = {steps: [0, 10], currentStep: 0};
        const validation = await _validateAnswer(pyramid, setPyramid, goToNextQuestion)('123abc', 'A');
        expect(validation).toBe(true);
    });

    it('A correct given answer should trigger the retrieval of the next question', async () => {
        pyramid = {steps: [0, 10], currentStep: 0};
        await _validateAnswer(pyramid, setPyramid, goToNextQuestion)('123abc', 'A');
        expect(goingToTheNextQuestion).toBe(true);
    });

    it('A wrong given answer should NOT trigger the retrieval of the next question', async () => {
        pyramid = {steps: [0, 10], currentStep: 0};
        await _validateAnswer(pyramid, setPyramid, goToNextQuestion)('123abc', 'B');
        expect(goingToTheNextQuestion).toBe(false);
    });

    it.each`
        initialPyramid | givenAnswer | expectedCurrentStep
         ${{steps: [0, 10], currentStep: 0}} | ${'A'} | ${10}
         ${{steps: [10, 20], currentStep: 10}} | ${'A'} |${20}
         ${{steps: [0, 10], currentStep: 0}} | ${'B'} |${0}
         ${{steps: [10, 20, 30], currentStep: 20}} | ${'B'} |${10}
    `('A correct given answer should increase the pyramid $initialPyramid.steps by one step', async (
        {initialPyramid, givenAnswer, expectedCurrentStep}
    ) => {
        // GIVEN - ARRANGE
        pyramid = initialPyramid;
        // WHEN - ACT
        await _validateAnswer(initialPyramid, setPyramid, goToNextQuestion)('123abc', givenAnswer);
        // THEN - ASSERT
        expect(pyramid).toEqual({
            ...pyramid,
            currentStep: expectedCurrentStep
        });
    });

});
