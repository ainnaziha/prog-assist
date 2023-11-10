import registerUser from '@/defer/api/register';
import { NextResponse } from 'next/server';
import { AuthRequest } from '@/defer/lib/models/request';

export async function POST(request: Request) 
{
  try {
    const data: AuthRequest = await request.json();

    const user = await registerUser(data);
    
    return NextResponse.json({ 
      data: user, 
      message: 'Your account have been registered successfully!' },
    );
   } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}