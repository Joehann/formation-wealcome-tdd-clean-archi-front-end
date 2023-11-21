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
import {retrieveNextQuestion} from "../core-logic/use-cases/question-retrieval/nextQuestionRetrievalListener.ts";

export type Dependencies = {
    questionGateway: QuestionGateway
}


export const initReduxStore = (options: {
    dependencies?: Partial<Dependencies>,
    pyramidSteps?: number[],
    enableActionsListeners?: boolean,
}) => {
    const config = {
        dependencies: options.dependencies || {},
        pyramidSteps: options.pyramidSteps || [0, 200, 300, 500, 100000],
        enableActionsListeners: options.enableActionsListeners || false,
    };
    return configureStore({
        reducer: {
            questionRetrieval,
            answerValidation,
            pyramid: pyramidReducer(config.pyramidSteps),
        },
        devTools: true,
        middleware: (getDefaultMiddleware) => {
            const middleware = getDefaultMiddleware({
                thunk: {
                    extraArgument: config.dependencies
                },
                serializableCheck: false,
            });
            if (config.enableActionsListeners)
                middleware.prepend(retrieveNextQuestion().middleware);
            return middleware;
        }
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
