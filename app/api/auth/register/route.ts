import bcrypt from 'bcrypt';
import executeQuery from '@/lib/db';
import { NextResponse } from 'next/server';
import { AuthRequest } from '@/lib/models/request';
import { User } from '@/lib/models/user';
import { setUser } from '@/lib/auth';

export async function POST(request: Request) 
{
  const data: AuthRequest = await request.json();
  
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

  const values = [data.name, data.email, hashedPassword];
  try {
    const result = await executeQuery({ query, values });
    const user: User = {
      id: result.insertId,
      name: data.name!,
      email: data.email,
    };

    setUser(user);
    return NextResponse.json({ 
      data: user, 
      message: 'Your account have been registered successfully!' },
    );
   } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}