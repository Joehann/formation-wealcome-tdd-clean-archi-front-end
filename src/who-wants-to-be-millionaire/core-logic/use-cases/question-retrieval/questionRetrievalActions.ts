import {createAction} from "@reduxjs/toolkit";
import {Question} from "./question.ts";

const questionRetrievedAction =
    createAction<{question: Question}>('QUESTION_RETRIEVED');

export {questionRetrievedAction};
