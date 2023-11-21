import {QuestionGateway} from "../../gateways/questionGateway.ts";
import {AnswerLetter} from "../question-retrieval/question.ts";

export type Pyramid = {
    steps: number[];
    currentStep: number;
}

export const validateAnswer = (questionGateway: QuestionGateway) =>
    (pyramid: Pyramid, setPyramid: (pyramid: Pyramid) => void, goToNextQuestion: () => void) =>
        async (questionId: string, givenAnswer: AnswerLetter) => {

            const increaseStep = () => {
                const currentStepIndex = steps.indexOf(currentStep);
                setPyramid({...pyramid, currentStep: steps[currentStepIndex + 1]});
            }

            const resetPyramid = () => {
                setPyramid({...pyramid, currentStep: steps[0]});
            }

            const isCorrect = await questionGateway.validate(questionId, givenAnswer);
            const {steps, currentStep} = pyramid;
            if (isCorrect) {
                increaseStep();
                goToNextQuestion();
            }
            else
                resetPyramid();
            return isCorrect;
        }
