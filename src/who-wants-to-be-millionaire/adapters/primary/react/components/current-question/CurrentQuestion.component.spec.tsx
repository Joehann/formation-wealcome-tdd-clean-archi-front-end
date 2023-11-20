import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {UseCasesContext} from "../../useCasesInjections.tsx";
import {QuestionGatewayStub} from "../../../../secondary/gateways/questionGatewayStub.ts";
import {validateAnswer} from "../../../../../core-logic/use-cases/answer-validation/validateAnswer.ts";
import App from "../App.tsx";

describe('Question component', () => {

    it('should inform about a correct given answer',
        async () => {
            const questionGateway = new QuestionGatewayStub();
            questionGateway.currentValidation = {B: true}
            // given
            let informedAboutCorrectAnswer: boolean = false;
            vitest.spyOn(window, 'alert')
                .mockImplementation((message: string) => {
                    if (message)
                        informedAboutCorrectAnswer = true;
                });
            render(<UseCasesContext.Provider value={{
                validateAnswer: validateAnswer(questionGateway)
            }}>
                <App/>
            </UseCasesContext.Provider>);
            // when
            await userEvent.click(screen.getByText('Test-Driven Development'));
            // then
            expect(informedAboutCorrectAnswer).toBeTruthy();
        });

});
