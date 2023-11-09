import { NextResponse } from 'next/server';
import { Assessment } from '@/lib/models/contents';

export async function GET(request: Request) 
{  
  try {
    const category = new URL(request.url).searchParams.get('category');

    const result: Assessment[] = [
      {
          id: 1,
          question: category ?? '',
          options: ['asad', 'basdaassda'],
          answer: null,
          error: null
      },
      {
          id: 2,
          question: 'testaa',
          options: ['aasd', 'basdasda'],
          answer: null,
          error: null
      }
  ];
    
    return NextResponse.json({ 
      data: result 
    });
   } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}