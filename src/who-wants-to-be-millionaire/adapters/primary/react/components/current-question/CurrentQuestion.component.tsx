import {QuestionTitle} from "./QuestionTitle.component.tsx";
import {PossibleAnswers} from "./PossibleAnswers.component.tsx";
import jfoucault from "../../../../../../assets/img/jfoucault.jpeg";
import {Countdown} from "../countdown/Countdown.tsx";
import {useContext, useEffect, useState} from "react";
import {UseCasesContext} from "../../useCasesInjections.tsx";
import {Question} from "../../../../../core-logic/use-cases/question-retrieval/question.ts";

export const CurrentQuestion = () => {

    const {retrieveQuestion} = useContext(UseCasesContext);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

    useEffect(() => {
        async function retrieveCurrentQuestion() {
            const question = await retrieveQuestion();
            setCurrentQuestion(question);
        }
        retrieveCurrentQuestion();
    }, []);

    return (
        <div>
            <img src={jfoucault} alt="Jean-Pierre Foucault"/>
            <br/>
            {currentQuestion && <><Countdown/>
                <QuestionTitle title={currentQuestion!.label}/>
                <PossibleAnswers possibleAnswers={currentQuestion.possibleAnswers}/>
            </>}
        </div>
    );
};
