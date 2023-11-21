import {createReducer} from "@reduxjs/toolkit";
import {questionRetrievedAction} from "../use-cases/question-retrieval/questionRetrievalActions.ts";
import {AppState} from "../../store/appState.ts";

export const questionRetrievalReducer =
    createReducer<AppState['questionRetrieval']>(
        null,
        builder => {
            builder.addCase(questionRetrievedAction,
                (_, action) => {
                    return {
                        data: action.payload.question,
                    };
                }
            );
        });
