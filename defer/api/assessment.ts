import { generatePrompt, inference } from "../lib/ai-helper";
import executeQuery from "../lib/db";
import { defer } from "@defer/client";
import { AssessmentRequest } from "../lib/models/request";

async function sendAssessment(userId: number, request: AssessmentRequest) {
  try {
    const response = await inference.textGeneration({
      model: process.env.HF_MODEL,
      inputs: generatePrompt(request.type, JSON.stringify(request.questions)),
      parameters: {
        max_new_tokens: 500,
        // @ts-ignore
        typical_p: 0.2,
        repetition_penalty: 1,
        return_full_text: false,
      },
    });
    
    const query = 'INSERT INTO results (user_id, type, recommendation) VALUES (?, ?, ?)';
    const values = [userId, request.type, response.generated_text];
    
    const result: any = await executeQuery({ query, values });

    const date = new Date();

    return {
      id: result.insertId,
      category: request.type,
      date: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
      recommendation: response.generated_text
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default defer(sendAssessment);