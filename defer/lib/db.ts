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
    throw new Error(error.message);
  }
}