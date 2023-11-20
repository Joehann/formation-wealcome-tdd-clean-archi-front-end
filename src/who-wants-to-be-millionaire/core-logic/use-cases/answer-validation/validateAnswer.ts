import {QuestionGateway} from "../../gateways/questionGateway.ts";

export type Pyramid = {
    steps: number[];
    currentStep: number;
}

export const validateAnswer = (questionGateway: QuestionGateway) =>
    (pyramid: Pyramid, setPyramid: (pyramid: Pyramid) => void) =>
        async (givenAnswer: string) => {

            const increaseStep = () => {
                const currentStepIndex = steps.indexOf(currentStep);
                setPyramid({...pyramid, currentStep: steps[currentStepIndex + 1]});
            }

            const resetPyramid = () => {
                setPyramid({...pyramid, currentStep: steps[0]});
            }

            const isCorrect = await questionGateway.validate(givenAnswer);
            const {steps, currentStep} = pyramid;
            if (isCorrect)
                increaseStep();
            else
                resetPyramid();
            return isCorrect;
        }
