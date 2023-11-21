import {createReducer} from "@reduxjs/toolkit";
import {AppState} from "../../store/appState.ts";
import {answerValidatedAction} from "../use-cases/answer-validation/validateAnswerActions.ts";
import {questionRetrievedAction} from "../use-cases/question-retrieval/questionRetrievalActions.ts";

export const answerValidationReducer =
    createReducer<AppState['answerValidation']>(
        null,
        builder => {
            builder.addCase(answerValidatedAction,
                (_, action) => {
                    return {
                        isCorrect: action.payload.isCorrect,
                    };
                });
            builder.addCase(questionRetrievedAction,
                () => {
                    return null;
                });
        }
    );
