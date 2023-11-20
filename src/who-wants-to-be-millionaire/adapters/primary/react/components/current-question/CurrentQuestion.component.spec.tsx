import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {UseCasesContext} from "../../useCasesInjections.tsx";
import {QuestionGatewayStub} from "../../../../secondary/gateways/questionGatewayStub.ts";
import {validateAnswer} from "../../../../../core-logic/use-cases/answer-validation/validateAnswer.ts";
import App from "../App.tsx";
import "@testing-library/jest-dom";

describe('Question component', () => {

    let questionGateway: QuestionGatewayStub;

    beforeEach(() => {
        questionGateway = new QuestionGatewayStub();
        questionGateway.currentValidation = {B: true}
    });

    describe('Upon a first correct answer', () => {

        it('should inform about the correctness',
            async () => {
                // given
                let informedAboutCorrectAnswer: boolean = false;
                vitest.spyOn(window, 'alert')
                    .mockImplementation((message: string) => {
                        if (message)
                            informedAboutCorrectAnswer = true;
                    });
                renderAppComponent();
                // when
                await userEvent.click(screen.getByText('Test-Driven Development'));
                // then
                expect(informedAboutCorrectAnswer).toBeTruthy();
            });

        it('should increase the pyramid step',
            async () => {
                // given
                renderAppComponent();
                // when
                await userEvent.click(screen.getByText('Test-Driven Development'));
                // then
                expect(screen.getByText('0 €')).not.toHaveClass('rounded-full bg-orange-500');
                expect(screen.getByText('1000000 €')).toHaveClass('rounded-full bg-orange-500');
            });
    });

    const renderAppComponent = () => {
        render(<UseCasesContext.Provider value={{
            validateAnswer: validateAnswer(questionGateway)
        }}>
            <App/>
        </UseCasesContext.Provider>);
    }
});
