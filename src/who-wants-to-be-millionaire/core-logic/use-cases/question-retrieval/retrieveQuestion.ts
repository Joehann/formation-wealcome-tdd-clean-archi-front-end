import {AppThunk, ReduxStore} from "../../../store/reduxStore.ts";

export const retrieveQuestion = (): AppThunk => {
    return async (dispatch: ReduxStore['dispatch'], _, dependencies) => {
        const question = await dependencies.questionGateway.retrieveQuestion();
        dispatch({
            type: 'QUESTION_RETRIEVED',
            payload: question
        });
    };
}
