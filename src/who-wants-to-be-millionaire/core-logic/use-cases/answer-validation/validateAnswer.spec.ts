import {expect} from 'vitest'
import {QuestionGatewayStub} from "../../../adapters/secondary/gateways/questionGatewayStub.ts";
import {validateAnswer} from "./validateAnswer.ts";
import {initReduxStore, ReduxStore} from "../../../store/reduxStore.ts";
import {AppState} from "../../../store/appState.ts";

describe('Validate Answer', () => {

    let questionGateway: QuestionGatewayStub;
    let store: ReduxStore;
    let initialState: AppState;

    beforeEach(() => {
        questionGateway = new QuestionGatewayStub();
        store = initReduxStore({dependencies: {questionGateway}});
        questionGateway.currentValidation = {'123abc': 'A'};
        initialState = store.getState();
    });

    it('A correct given answer should end up with a successful validation', async () => {
        await store.dispatch(validateAnswer('123abc', 'A'));
        initialState = store.getState();
        expect(store.getState()).toEqual({
            ...initialState,
            answerValidation: {
                isCorrect: true
            }
        });
    });

    it('A correct given answer should end up with a successful validation', async () => {
        await store.dispatch(validateAnswer('123abc', 'A'));
        initialState = store.getState();
        expect(store.getState()).toEqual({
            ...initialState,
            answerValidation: {
                isCorrect: true
            }
        });
    });

    it('A wrong given answer should end up with a bad validation', async () => {
        await store.dispatch(validateAnswer('123abc', 'B'));
        initialState = store.getState();
        expect(store.getState()).toEqual({
            ...initialState,
            answerValidation: {
                isCorrect: false
            }
        });
    });
});
