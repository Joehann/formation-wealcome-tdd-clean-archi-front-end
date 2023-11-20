import {useContext} from "react";
import {UseCasesContext} from "../main.tsx";
import {GameContext} from "./App.tsx";

export const PossibleAnswers = () => {

    const {validateAnswer} = useContext(UseCasesContext);
    const {pyramid, setPyramid} = useContext(GameContext);

    const validateThatAnswer = (givenThatAnswer: string) => async () => {
        const validation = await validateAnswer(pyramid, setPyramid)(givenThatAnswer);
        alert(validation);
    }

    return (
        <div
            className="w-full justify-center grid grid-cols-2 text-white gap-4 font-mono text-sm text-left font-bold leading-6 bg-stripes-fuchsia rounded-lg">
            <div className="border-3 border-blue-300 rounded-lg px-3 py-1 bg-gray-900"
                 onClick={(validateThatAnswer('A'))}>
                <span className="text-orange-500">A:</span> Third-Driven Development
            </div>
            <div className="border-3 border-blue-300 rounded-lg px-3 py-1 bg-gray-900"
                 onClick={(validateThatAnswer('B'))}>
                <span className="text-orange-500">B:</span> Test-Driven Development
            </div>
            <div className="border-3 border-blue-300 rounded-lg px-3 py-1 bg-gray-900"
                 onClick={(validateThatAnswer('C'))}>
                <span className="text-orange-500">C:</span> Test-Deep Development
            </div>
            <div className="border-3 border-blue-300 rounded-lg px-3 py-1 bg-gray-900"
                 onClick={(validateThatAnswer('D'))}>
                <span className="text-orange-500">D:</span> Test-Driven Design
            </div>
        </div>
    );
};
