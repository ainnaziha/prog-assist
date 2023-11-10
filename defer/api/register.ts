import executeQuery from "../lib/db";
import { AuthRequest } from "../lib/models/request";
import bcrypt from 'bcrypt';
import { User } from "../lib/models/user";
import { setUser } from "../lib/auth";

export async function registerUser(request: AuthRequest) {
  try {
    const hashedPassword = await bcrypt.hash(request.password, 10);
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  
    const values = [request.name, request.email, hashedPassword];

    const result: any = await executeQuery({ query, values });

    const user: User = {
      id: result.insertId,
      name: request.name!,
      email: request.email,
    };

    setUser(user);

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}