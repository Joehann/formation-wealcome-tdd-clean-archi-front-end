import {AnyAction} from "@reduxjs/toolkit";
import {AppState} from "../../store/appState.ts";

export const pyramidReducer = (pyramidSteps: number[]) =>
    (state: AppState['pyramid'] = {currentStep: 0, steps: pyramidSteps},
     action: AnyAction) => {
        if (action.type === "ANSWER_VALIDATED") {
            const currentStepIndex = pyramidSteps.indexOf(state.currentStep);
            return {
                ...state,
                currentStep: action.payload.isCorrect ? pyramidSteps[currentStepIndex + 1] : 0
            };
        }
        return state;
    };
