import executeQuery from "../lib/db";
import { defer } from "@defer/client";
import { AuthRequest } from "../lib/models/request";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { User } from "../lib/models/user";
import { setUser } from "../lib/auth";

async function loginUser(request: AuthRequest) {
    try {
      const query = 'SELECT * FROM users WHERE email = ?';
      const values = [request.email];
      
      const result: any = await executeQuery({ query, values });
    
    if (result.length === 0) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 404 });
    }
    
    const userResult = result[0];
    
    const passwordMatch = await bcrypt.compare(request.password, userResult.password);
    
    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const user: User = {
      id: userResult.id,
      name: userResult.name,
      email: userResult.email,
    };
    
    setUser(user);

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default defer(loginUser);