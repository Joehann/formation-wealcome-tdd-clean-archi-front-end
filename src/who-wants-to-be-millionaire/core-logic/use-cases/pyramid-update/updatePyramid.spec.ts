import {initReduxStore, ReduxStore} from "../../../store/reduxStore.ts";
import {AppState} from "../../../store/appState.ts";

describe('Update Pyramid', () => {

    let store: ReduxStore;
    let initialState: AppState;
    let pyramidSteps: number[] = [0, 10, 20];

    beforeEach(() => {
        store = initReduxStore({}, pyramidSteps);
        initialState = store.getState();
    });

    describe('Before first validation', () => {
        it('pyramid is reset', async () => {
            expectPyramidToBe(0);
        });
    });

    describe('Upon a correct validation', () => {

        it.each`
            numberOfCorrectValidations | expectedCurrentStep
            ${1}                       | ${10}
            ${2}                       | ${20}
        `('pyramid goes up by one step', async (
            {numberOfCorrectValidations, expectedCurrentStep}
        ) => {
            for (let i = 0; i < numberOfCorrectValidations; i++)
                store.dispatch({type: 'ANSWER_VALIDATED', payload: {isCorrect: true}});
            initialState = store.getState();
            expectPyramidToBe(expectedCurrentStep);
        });
    });

    describe('Upon a bad validation', () => {

        it('pyramid must be reset', () => {
            store.dispatch({type: 'ANSWER_VALIDATED', payload: {isCorrect: true}});
            store.dispatch({type: 'ANSWER_VALIDATED', payload: {isCorrect: false}});
            initialState = store.getState();
            expectPyramidToBe(0);
        });

    });

    const expectPyramidToBe = (currentStep: number) => {
        expect(store.getState()).toEqual({
            ...initialState,
            pyramid: {
                currentStep,
                steps: pyramidSteps
            }
        })
    }


});
