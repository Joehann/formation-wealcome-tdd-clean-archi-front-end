import {FC} from "react";
import {AnswerLetter, Question} from "../../../../../core-logic/use-cases/question-retrieval/question.ts";

type Props = {
    possibleAnswers: Question['possibleAnswers'],
    onGivenAnswer: (givenAnswer: AnswerLetter) => () => void;
}

export const PossibleAnswers: FC<Props> = ({possibleAnswers, onGivenAnswer}) => {

    return (
        <div
            className="w-full justify-center grid grid-cols-2 text-white gap-4 font-mono text-sm text-left font-bold leading-6 bg-stripes-fuchsia rounded-lg">
            {possibleAnswers && Object.entries(possibleAnswers).map(([letter, label]) => (
                <div key={letter}
                     className="border-3 border-blue-300 rounded-lg px-3 py-1 bg-gray-900"
                     onClick={onGivenAnswer(letter as AnswerLetter)}>
                    <span className="text-orange-500">{letter}:</span> {label}
                </div>
            ))}
        </div>
    );
};
