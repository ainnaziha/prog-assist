import { generatePrompt, inference } from "@/lib/ai-helper";
import { AssessmentRequest } from "@/lib/models/request";
import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST(request: Request) 
{  
  try {
    const data: AssessmentRequest = await request.json();

    // const response = await inference.textGeneration({
    //   model: process.env.HF_MODEL,
    //   inputs: generatePrompt(category ?? ''),
    //   parameters: {
    //     max_new_tokens: 500,
    //     // @ts-ignore
    //     typical_p: 0.2,
    //     repetition_penalty: 1,
    //     return_full_text: false,
    //   },
    // });

    //let jsonObject = JSON.parse(response.generated_text);

    return NextResponse.json({ 
      data: data,
    });
   } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}