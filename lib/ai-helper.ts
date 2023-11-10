import { HfInference } from "@huggingface/inference";

export const inference = new HfInference(process.env.HF_ACCESS_TOKEN);

export function generatePrompt(category: string): string {
    return `<|prompter|>
    I need a set of 5 questions for a user assessment in the category of ${category}. The questions should cover the score, compatibility, and recommendations to improve. The answers should be provided in multiple-choice format. Please format the output only in JSON below.
    [
        {
            question: str
            options: []
        }
    ]
     <|endoftext|><|assistant|>
    `;
}