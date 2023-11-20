import {QuestionGateway} from "../../gateways/questionGateway.ts";

export type Pyramid = {
    steps: number[];
    currentStep: number;
}

export const validateAnswer = (questionGateway: QuestionGateway) =>
    (pyramid: Pyramid, setPyramid: (pyramid: Pyramid) => void) =>
        async (givenAnswer: string) => {

            const changeCurrentStep = (nextStepIndex: number) => {
                setPyramid({...pyramid, currentStep: steps[nextStepIndex]});
            }

            const isCorrect = await questionGateway.validate(givenAnswer);
            const {steps, currentStep} = pyramid;
            if (!isCorrect) {
                changeCurrentStep(0);
                return;
            }
            const currentStepIndex = steps.indexOf(currentStep);
            changeCurrentStep(currentStepIndex + 1);
            return isCorrect;
        }
