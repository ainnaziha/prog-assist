import { NextResponse } from 'next/server';
import { AssessmentResult } from '@/lib/models/contents';

export async function GET(request: Request) 
{  
  try {
    const pathSegments = new URL(request.url).pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];

    const result: AssessmentResult = {
      id: Number(id),
      category: 'test',
      date: '2021-2312',
      score: '60',
      compatibility: '50',
      recommendation: 'test recomme'
    }
    
    return NextResponse.json({ 
      data: result
    });
   } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}