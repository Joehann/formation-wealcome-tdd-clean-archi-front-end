import {AnswerLetter} from "../question-retrieval/question.ts";
import {AppThunk} from "../../../store/reduxStore.ts";
import {answerValidatedAction} from "./validateAnswerActions.ts";

export const validateAnswer = (questionId: string, givenAnswer: AnswerLetter): AppThunk =>
    async (dispatch, _, dependencies) => {
        const isCorrect = await dependencies.questionGateway.validate(questionId, givenAnswer);
        dispatch(answerValidatedAction({isCorrect}));
    }
