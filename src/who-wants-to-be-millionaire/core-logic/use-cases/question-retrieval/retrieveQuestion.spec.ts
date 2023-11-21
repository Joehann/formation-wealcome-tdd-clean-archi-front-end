import {QuestionGatewayStub} from "../../../adapters/secondary/gateways/questionGatewayStub.ts";
import {initReduxStore, ReduxStore} from "../../../store/reduxStore.ts";
import {Question} from "./question.ts";
import {retrieveQuestion} from "./retrieveQuestion.ts";
import {AppState} from "../../../store/appState.ts";
describe('Retrieve Question', () => {

    let questionGateway: QuestionGatewayStub;
    let store: ReduxStore;
    let initialState: AppState;

    beforeEach(() => {
        questionGateway = new QuestionGatewayStub();
        store = initReduxStore({questionGateway});
        initialState = store.getState();
    });

    it('should retrieve the current question', async () => {
        questionGateway.question = aQuestion;
        await store.dispatch(retrieveQuestion());
        expect(store.getState()).toEqual({
            ...initialState,
            questionRetrieval: {
                data: {
                    id: '123abc',
                    label: 'What is the capital of France?',
                    possibleAnswers: {
                        A: 'Paris',
                        B: 'London',
                        C: 'Berlin',
                        D: 'Madrid'
                    }
                }
            },
        });
    });

    const aQuestion: Question = {
        id: '123abc',
        label: 'What is the capital of France?',
        possibleAnswers: {
            A: 'Paris',
            B: 'London',
            C: 'Berlin',
            D: 'Madrid'
        }
    }
});
