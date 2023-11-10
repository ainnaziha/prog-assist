import { generatePrompt, inference } from "@/lib/ai-helper";
import { AssessmentRequest } from "@/lib/models/request";
import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST(request: Request) 
{  
  try {
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

    let keys = ["score", "compatibility", "recommendation"];
    let values = [];
    let str = response.generated_text;
    for (let i = 0; i < keys.length; i++) {
      let start = str.indexOf(keys[i]) + keys[i].length + 2;
      let end = i < keys.length - 1 ? str.indexOf(keys[i + 1]) : undefined;
      let value = str.substring(start, end).trim();
      values.push(value);
    }

    let jsonStr = `{
      "score": "${values[0]}",
      "compatibility": "${values[1]}",
      "recommendation": "${values[2]}"
    }`;

    return NextResponse.json({ 
      data: JSON.parse(jsonStr),
    });
   } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}