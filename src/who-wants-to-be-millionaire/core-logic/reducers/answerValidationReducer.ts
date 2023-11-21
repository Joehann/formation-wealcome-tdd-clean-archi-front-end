import {AnyAction} from "@reduxjs/toolkit";
import {AppState} from "../../store/appState.ts";

export const answerValidationReducer = (state: AppState['answerValidation'] = null, action: AnyAction) => {
    if (action.type === "ANSWER_VALIDATED") {
        return {
            isCorrect: action.payload.isCorrect,
        };
    }
    return state;
}
