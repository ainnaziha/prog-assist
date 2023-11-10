import { generatePrompt, inference } from "@/lib/ai-helper";
import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function GET(request: Request) 
{  
  try {
    const category = new URL(request.url).searchParams.get('category');

    const response = await inference.textGeneration({
      model: process.env.HF_MODEL,
      inputs: generatePrompt(category ?? ''),
      parameters: {
        max_new_tokens: 500,
        // @ts-ignore
        typical_p: 0.2,
        repetition_penalty: 1,
        return_full_text: false,
      },
    });

  //   const result: Assessment[] = [
  //     {
  //         id: 1,
  //         question: category ?? '',
  //         options: ['asad', 'basdaassda'],
  //         answer: null,
  //         error: null
  //     },
  //     {
  //         id: 2,
  //         question: 'testaa',
  //         options: ['aasd', 'basdasda'],
  //         answer: null,
  //         error: null
  //     }
  // ];
      
    //let jsonObject = JSON.parse(response.generated_text);

    return NextResponse.json({ 
      data: response.generated_text,
    });
   } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}