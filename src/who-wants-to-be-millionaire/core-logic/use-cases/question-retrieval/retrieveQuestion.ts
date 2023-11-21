import {AppThunk, ReduxStore} from "../../../store/reduxStore.ts";
import {questionRetrievedAction} from "./questionRetrievalActions.ts";

export const retrieveQuestion = (): AppThunk => {
    return async (dispatch: ReduxStore['dispatch'], _, dependencies) => {
        const question = await dependencies.questionGateway.retrieveQuestion();
        dispatch(questionRetrievedAction({question}));
    };
}
