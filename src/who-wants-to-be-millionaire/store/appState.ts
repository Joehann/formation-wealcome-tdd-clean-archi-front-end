import {Question} from "../core-logic/use-cases/question-retrieval/question.ts";

export interface AppState {
    questionRetrieval: {
        question: Question | null
    },
    answerValidation: {
        isCorrect: boolean
    } | null,
    pyramid: {
        currentStep: number;
        steps: number[];
    }
}
