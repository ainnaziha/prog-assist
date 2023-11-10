import { NextResponse } from 'next/server';
import { AssessmentResult } from '@/lib/models/contents';
import { getUser } from '@/lib/auth';
import executeQuery from '@/lib/db';

export async function GET(request: Request) 
{  
  try {
    const user = await getUser();

    if (user === null) {
      return NextResponse.json({ message: 'Unauthorized access' }, { status: 401 });
    }

    const query = 'SELECT * FROM results WHERE user_id = ? ORDER BY id DESC LIMIT 10';
    const values = [user.id];

    const result: any = await executeQuery({ query, values });
    
    const assessments = result.map((item: any) => {
      let date = new Date(item.created_at);
   
      return {
          id: item.id,
          category: item.type,
          date: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
          recommendation: item.recommendation
      }
    });
    
    return NextResponse.json({ 
      data: assessments 
    });
   } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}