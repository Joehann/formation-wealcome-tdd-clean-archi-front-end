import {AnyAction} from "@reduxjs/toolkit";

export const questionRetrievalReducer = (state = {question: null}, action: AnyAction) => {
    if (action.type === "QUESTION_RETRIEVED") {
        return {
            question: action.payload,
        };
    }
    return state;
}
