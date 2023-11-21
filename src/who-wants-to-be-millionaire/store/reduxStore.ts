import {
    Action,
    AnyAction,
    configureStore,
    Store,
    ThunkAction,
    ThunkDispatch,
} from "@reduxjs/toolkit";
import {AppState} from "./appState";
import {questionRetrievalReducer as questionRetrieval} from "../core-logic/reducers/questionRetrievalReducer.ts";
import {QuestionGateway} from "../core-logic/gateways/questionGateway.ts";
import {answerValidationReducer as answerValidation} from "../core-logic/reducers/answerValidationReducer.ts";
import {pyramidReducer} from "../core-logic/reducers/pyramidReducer.ts";

export type Dependencies = {
    questionGateway: QuestionGateway
}


export const initReduxStore = (dependencies: Partial<Dependencies>,
                               pyramidSteps: number[] = [0, 200, 300, 500, 100000]) => {
    return configureStore({
        reducer: {
            questionRetrieval,
            answerValidation,
            pyramid: pyramidReducer(pyramidSteps),
        },
        devTools: true,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: dependencies
                },
                serializableCheck: false,
            }),
    });
};

export type ReduxStore = Store<AppState> & {
    dispatch: ThunkDispatch<AppState, any, Action>;
};

export type AppThunk<ReturnType = Promise<void>> = ThunkAction<
    ReturnType,
    AppState,
    any,
    AnyAction
>;

export type AppDispatch = ThunkDispatch<AppState, any, Action>;
