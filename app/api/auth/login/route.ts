import bcrypt from 'bcrypt';
import executeQuery from '@/lib/db';
import { NextResponse } from 'next/server';
import { AuthRequest } from '@/lib/models/request';
import { User } from '@/lib/models/user';
import { setUser } from '@/lib/auth';

export async function POST(request: Request) 
{
  const data: AuthRequest = await request.json();
  
  const query = 'SELECT * FROM users WHERE email = ?';
  const values = [data.email];
  
  try {
    const result = await executeQuery({ query, values });
    
    if (result.length === 0) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 404 });
    }
    
    const userResult = result[0];
    
    const passwordMatch = await bcrypt.compare(data.password, userResult.password);
    
    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const user: User = {
      id: userResult.id,
      name: userResult.name,
      email: userResult.email,
    };
    
    setUser(user);
    return NextResponse.json({ 
      data: user, 
      message: 'You have been logged in successfully!' },
    );
   } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}