import {answerValidatedAction} from "../answer-validation/validateAnswerActions.ts";
import {createListenerMiddleware, TypedStartListening} from "@reduxjs/toolkit";
import {retrieveQuestion} from "./retrieveQuestion.ts";
import {AppDispatch} from "../../../store/reduxStore.ts";
import {AppState} from "../../../store/appState.ts";

export const retrieveNextQuestionListener = createListenerMiddleware();
const retrieval = retrieveNextQuestionListener.startListening as TypedStartListening<
    AppState,
    AppDispatch
>;
retrieval({
    actionCreator: answerValidatedAction,
    effect: async (_, listenerApi) => {
        await listenerApi.dispatch(retrieveQuestion());
    },
});
