export type AuthRequest = {
    name: string | null,
    email: string,
    password: string
}

export type AssessmentRequest = {
    type: string,
    questions: {
        question: string,
        answer: string,
    }[],
}