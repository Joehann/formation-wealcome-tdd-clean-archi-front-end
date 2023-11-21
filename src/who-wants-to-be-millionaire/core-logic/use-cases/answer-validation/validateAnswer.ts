import {AnswerLetter} from "../question-retrieval/question.ts";
import {AppThunk} from "../../../store/reduxStore.ts";

export const validateAnswer = (questionId: string, givenAnswer: AnswerLetter): AppThunk =>
    async (dispatch, _, dependencies) => {
        const isCorrect = await dependencies.questionGateway.validate(questionId, givenAnswer);
        dispatch({
            type: 'ANSWER_VALIDATED',
            payload: {
                isCorrect
            }
        });
    }
