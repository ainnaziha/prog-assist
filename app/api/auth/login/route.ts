import { loginUser } from '@/defer/api/login';
import { NextResponse } from 'next/server';
import { AuthRequest } from '@/defer/lib/models/request';

export async function POST(request: Request) 
{
  try {
    const data: AuthRequest = await request.json();

    const user = await loginUser(data);
    
    return NextResponse.json({ 
      data: user, 
      message: 'You have been logged in successfully!' },
    );
   } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}