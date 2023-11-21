import {Question} from "./question.ts";
import {initReduxStore, ReduxStore} from "../../../store/reduxStore.ts";
import {AppState} from "../../../store/appState.ts";
import {QuestionGatewayStub} from "../../../adapters/secondary/gateways/questionGatewayStub.ts";
import {questionRetrievedAction} from "./questionRetrievalActions.ts";
import {answerValidatedAction} from "../answer-validation/validateAnswerActions.ts";

describe('Retrieve Question Listener', () => {

    let store: ReduxStore;
    let initialState: AppState;
    let questionGateway: QuestionGatewayStub;

    beforeEach(() => {
        questionGateway = new QuestionGatewayStub();
        store = initReduxStore({dependencies: {questionGateway}, enableActionsListeners: true});
        initialState = store.getState();
        store.dispatch(questionRetrievedAction({question: firstQuestion}));
    });

    it('should retrieve the next question upon a correct answer', done => {
            store.subscribe(() => {
                /*if(store.getState().answerValidation)
                    return;*/
                console.log(store.getState());
                /*expect(store.getState()).toEqual({
                    ...initialState,
                    questionRetrieval: {
                        data: firstQuestion,
                    },
                });*/
                done();
            });
            store.dispatch(answerValidatedAction({isCorrect: true}));
        }
    );

    const firstQuestion: Question = {
        id: '123abc',
        label: 'What is the capital of France?',
        possibleAnswers: {
            A: 'Paris',
            B: 'London',
            C: 'Berlin',
            D: 'Madrid'
        }
    };

    const nextQuestion: Question = {
        id: '456def',
        label: 'What is the capital of Spain?',
        possibleAnswers: {
            A: 'Paris',
            B: 'London',
            C: 'Berlin',
            D: 'Madrid'
        }
    }
});


