import { NextResponse } from 'next/server';
import { getHistory } from '@/defer/api/assessment-history';
import { getUser } from '@/defer/lib/auth';
import executeQuery from '@/defer/lib/db';

export async function GET(request: Request) 
{  
  try {
    const user = await getUser();

    if (user === null) {
      return NextResponse.json({ message: 'Unauthorized access' }, { status: 401 });
    }

    const assessments = await getHistory(user.id);
    
    return NextResponse.json({ 
      data: assessments 
    });
   } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}