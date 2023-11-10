import { getUser } from "@/defer/lib/auth";
import { sendAssessment } from "@/defer/api/assessment";
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
      
    const result = await sendAssessment(user.id, data);
    
    return NextResponse.json({ 
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}