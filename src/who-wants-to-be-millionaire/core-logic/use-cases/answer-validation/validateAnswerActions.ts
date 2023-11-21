import {createAction} from "@reduxjs/toolkit";

const answerValidatedAction =
    createAction<{isCorrect: boolean}>('ANSWER_VALIDATED');

export {answerValidatedAction};
