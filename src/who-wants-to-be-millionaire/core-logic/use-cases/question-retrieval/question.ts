export type Question = {
    id: string;
    label: string;
    possibleAnswers: Record<AnswerLetter, Answer>;
}

export type Answer = string;

export type AnswerLetter = 'A' | 'B' | 'C' | 'D';
