import {FC, useContext} from "react";
import {GameContext} from "../App.tsx";
import {UseCasesContext} from "../../useCasesInjections.tsx";
import {AnswerLetter, Question} from "../../../../../core-logic/use-cases/question-retrieval/question.ts";

type Props = {
    questionId: Question['id'],
    possibleAnswers: Question['possibleAnswers'],
    goToNextQuestion: () => void;
}

export const PossibleAnswers: FC<Props> = ({questionId, possibleAnswers, goToNextQuestion}) => {

    const {validateAnswer} = useContext(UseCasesContext);
    const {pyramid, setPyramid} = useContext(GameContext);

    const validateThatAnswer = (givenThatAnswer: AnswerLetter) => async () =>
        validateAnswer(pyramid, setPyramid, goToNextQuestion)(questionId, givenThatAnswer)

    return (
        <div
            className="w-full justify-center grid grid-cols-2 text-white gap-4 font-mono text-sm text-left font-bold leading-6 bg-stripes-fuchsia rounded-lg">
            {possibleAnswers && Object.entries(possibleAnswers).map(([letter, label]) => (
                <div key={letter}
                     className="border-3 border-blue-300 rounded-lg px-3 py-1 bg-gray-900"
                     onClick={validateThatAnswer(letter as AnswerLetter)}>
                    <span className="text-orange-500">{letter}:</span> {label}
                </div>
            ))}
        </div>
    );
};
