import { NextResponse } from 'next/server';
import { AssessmentResult } from '@/lib/models/contents';
import executeQuery from '@/lib/db';

export async function GET(request: Request) 
{  
  try {
    const pathSegments = new URL(request.url).pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];

    const query = 'SELECT * FROM results WHERE id = ?';
    const values = [id];

    const result = await executeQuery({ query, values });

    if (result.length === 0) {
      return NextResponse.json({ message: 'Not Found' }, { status: 404 });
    }

    let date = new Date(result[0].created_at);

    const assessment: AssessmentResult = {
      id: result[0].id,
      category: result[0].type,
      date: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
      recommendation: result[0].recommendation
    }
    
    return NextResponse.json({ 
      data: assessment,
    });
   } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}