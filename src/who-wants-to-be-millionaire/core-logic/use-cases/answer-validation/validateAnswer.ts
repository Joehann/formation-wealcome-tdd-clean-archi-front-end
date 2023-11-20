import {QuestionGateway} from "../../gateways/questionGateway.ts";

export type Pyramid = {
    steps: number[];
    currentStep: number;
}

export const validateAnswer = (questionGateway: QuestionGateway) => (pyramid: Pyramid) =>
    async (givenAnswer: string) => {
        const isCorrect = await questionGateway.validate(givenAnswer);
        const {steps, currentStep} = pyramid;
        if (isCorrect) {
            const currentStepIndex = steps.indexOf(currentStep);
            pyramid.currentStep = steps[currentStepIndex + 1];
        }
        else
            pyramid.currentStep = pyramid.steps[0];
        return isCorrect;
    }
