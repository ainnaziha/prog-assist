import fs from 'fs';
import mysql from "serverless-mysql";

const db = mysql({
  config: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  }
});
 
interface QueryParams {
  query: string;
  values: any[];
}
 
export default async function executeQuery({ query, values }: QueryParams) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error: any) {
    const date = new Date();
    const logName = `log/error-${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}.log`;
    fs.appendFileSync(logName, `${date.toISOString()}: ${error}\n`);
    throw new Error(error.message);
  }
}