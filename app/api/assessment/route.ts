import { generatePrompt, inference } from "@/lib/ai-helper";
import { getUser } from "@/lib/auth";
import executeQuery from "@/lib/db";
import { AssessmentRequest } from "@/lib/models/request";
import { NextResponse } from "next/server";

export const runtime = 'edge';

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

    let keys = ["score", "compatibility", "recommendation"];
    let keyVals = [];
    const str = response.generated_text;
    for (let i = 0; i < keys.length; i++) {
      let start = str.indexOf(keys[i]) + keys[i].length + 2;
      let end = i < keys.length - 1 ? str.indexOf(keys[i + 1]) : undefined;
      let value = str.substring(start, end).trim();
      keyVals.push(value);
    }

    const date = new Date();
    
    const jsonStr = `{
      "id": 0,
      "score": "${keyVals[0]}",
      "compatibility": "${keyVals[1]}",
      "recommendation": "${keyVals[2]}",
      "date": "${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}"
    }`;

    const json =  JSON.parse(jsonStr);

    const query = 'INSERT INTO results (user_id, type, score, compatibility, recommendation) VALUES (?, ?, ?, ?, ?)';
    const values = [user.id, data.type, json.score, json.compatibility, json.recommendation];

    const result = await executeQuery({ query, values });
    
    json.id = result.insertId;

    return NextResponse.json({ 
      data: json,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}