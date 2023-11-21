import {createReducer} from "@reduxjs/toolkit";
import {AppState} from "../../store/appState.ts";
import {answerValidatedAction} from "../use-cases/answer-validation/validateAnswerActions.ts";

export const pyramidReducer = (pyramidSteps: number[]) =>
    createReducer<AppState['pyramid']>(
        {currentStep: 0, steps: pyramidSteps},
        builder => {
            builder.addCase(answerValidatedAction,
                (state, action) => {
                    const currentStepIndex = pyramidSteps.indexOf(state.currentStep);
                    return {
                        ...state,
                        currentStep: action.payload.isCorrect ? pyramidSteps[currentStepIndex + 1] : 0
                    };
                });
        }
    )
