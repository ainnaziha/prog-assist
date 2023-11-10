import sendAssessment from '@/defer/api/assessment-id';
import { NextResponse } from 'next/server';

export async function GET(request: Request) 
{  
  try {
    const pathSegments = new URL(request.url).pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];

    const assessment = await sendAssessment(id);
    
    return NextResponse.json({ 
      data: assessment,
    });
   } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}