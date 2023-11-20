export interface QuestionGateway {
    validate(givenAnswer: string): Promise<boolean>;
}
