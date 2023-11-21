import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {QuestionGatewayStub} from "../../../../secondary/gateways/questionGatewayStub.ts";
import App from "../App.tsx";
import "@testing-library/jest-dom";
import {Provider} from "react-redux";
import {initReduxStore, ReduxStore} from "../../../../../store/reduxStore.ts";

describe('Question component', () => {

    let questionGateway: QuestionGatewayStub;
    let store: ReduxStore;

    beforeEach(() => {
        questionGateway = new QuestionGatewayStub();
        questionGateway.currentValidation = {'123abc': 'A'}
        questionGateway.question = {
            id: '123abc',
            label: 'What is the capital of France?',
            possibleAnswers: {
                A: 'Paris',
                B: 'London',
                C: 'Berlin',
                D: 'Madrid'
            }
        }
        store = initReduxStore({questionGateway}, [0, 1000000]);
    });

    describe('When the game starts', () => {

        it('should retrieve the current question', async() => {
            renderAppComponent();
            expect(await screen.findByText('What is the capital of France?')).toBeInTheDocument();
        });

    });

    describe('Upon a first correct answer', () => {

        it('should increase the pyramid step',
            async () => {
                renderAppComponent();
                await userEvent.click(await screen.findByText('Paris'));
                expect(await screen.findByText('0 €')).not.toHaveClass('rounded-full bg-orange-500');
                expect(screen.getByText('1000000 €')).toHaveClass('rounded-full bg-orange-500');
            });
    });

    const renderAppComponent = () => {
        render(<Provider store={store} >
            <App/>
        </Provider>);
    }
});
