import { generatePrompt, inference } from "@/defer/lib/ai-helper";
import { getUser } from "@/defer/lib/auth";
import executeQuery from "@/defer/lib/db";
import { AssessmentRequest } from "@/defer/lib/models/request";
import { NextResponse } from "next/server";

export async function POST(request: Request) 
{  
  try {
    const user = await getUser();

    if (user === null) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }
    
    const data: AssessmentRequest = await request.json();

    const response = await inference.textGeneration({
      model: process.env.HF_MODEL,
      inputs: generatePrompt(data.type, JSON.stringify(data.questions)),
      parameters: {
        max_new_tokens: 500,
        // @ts-ignore
        typical_p: 0.2,
        repetition_penalty: 1,
        return_full_text: false,
      },
    });
    
    const query = 'INSERT INTO results (user_id, type, recommendation) VALUES (?, ?, ?)';
    const values = [user.id, data.type, response.generated_text];
    
    const result: any = await executeQuery({ query, values });

    const date = new Date();

    return NextResponse.json({ 
      data: {
        id: result.insertId,
        category: data.type,
        date: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
        recommendation: response.generated_text
      },
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}