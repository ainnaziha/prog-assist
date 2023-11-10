import { HfInference } from "@huggingface/inference";

export const inference = new HfInference(process.env.HF_ACCESS_TOKEN);

export function generatePrompt(category: string, questions: string): string {
    return `<|prompter|>Assess the user's proficiency in ${category} development using the given answers. Question: ${questions} The questions cover aspects such as proficiency level, compatibility with frameworks/tools, and areas for improvement. Please provide an assessment result in the following format: { \"score\": \"\", \"compatibility\": \"\", \"recommendation\": \"\" }<|endoftext|><|assistant|>`;
}