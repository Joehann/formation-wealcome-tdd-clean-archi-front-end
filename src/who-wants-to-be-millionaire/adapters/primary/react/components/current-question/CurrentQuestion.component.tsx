import {QuestionTitle} from "./QuestionTitle.component.tsx";
import {PossibleAnswers} from "./PossibleAnswers.component.tsx";
import jfoucault from "../../../../../../assets/img/jfoucault.jpeg";
import {Countdown} from "../countdown/Countdown.tsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {retrieveQuestion} from "../../../../../core-logic/use-cases/question-retrieval/retrieveQuestion.ts";
import {AppDispatch} from "../../../../../store/reduxStore.ts";
import {AppState} from "../../../../../store/appState.ts";
import {AnswerLetter} from "../../../../../core-logic/use-cases/question-retrieval/question.ts";
import {validateAnswer} from "../../../../../core-logic/use-cases/answer-validation/validateAnswer.ts";

export const CurrentQuestion = () => {

    const dispatch = useDispatch<AppDispatch>();
    const question = useSelector((state: AppState) => state.questionRetrieval);

    useEffect(() => {
        dispatch(retrieveQuestion());
    }, []);

    const validateThatAnswer = (givenThatAnswer: AnswerLetter) => async () =>
        dispatch(validateAnswer(question!.data.id, givenThatAnswer));

    return (
        <div>
            <img src={jfoucault} alt="Jean-Pierre Foucault"/>
            <br/>
            {question && <><Countdown/>
                <QuestionTitle title={question.data.label}/>
                <PossibleAnswers possibleAnswers={question.data.possibleAnswers} onGivenAnswer={validateThatAnswer}/>
            </>}
        </div>
    );
};
