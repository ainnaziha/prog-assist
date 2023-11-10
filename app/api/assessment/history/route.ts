import { NextResponse } from 'next/server';
import { AssessmentResult } from '@/lib/models/contents';

export async function GET(request: Request) 
{  
  try {
    const result: AssessmentResult[] = [
      {
          id: 1,
          category: 'Frontend',
          date: '10 Nov 2023',
          recommendation: 'need to fix the teeth'
      },
      {
        id: 1,
        category: 'Backend',
        date: '10 Nov 2023',
        recommendation: 'need to fix the teeth'
      },
      {
        id: 1,
        category: 'Framework',
        date: '10 Nov 2023',
        recommendation: 'need to fix the teeth'
      } 
    ];
    
    return NextResponse.json({ 
      data: result 
    });
   } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}