import {validateAnswer} from "../../../core-logic/use-cases/answer-validation/validateAnswer.ts";
import {retrieveQuestion} from "../../../core-logic/use-cases/question-retrieval/retrieveQuestion.ts";
import React from "react";


export type UseCasesDef = {
    validateAnswer: ReturnType<typeof validateAnswer>;
    retrieveQuestion: ReturnType<typeof retrieveQuestion>;
}

export const UseCasesContext = React.createContext<UseCasesDef>(null as any);
