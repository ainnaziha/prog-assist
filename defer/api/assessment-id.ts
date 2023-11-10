import { NextResponse } from "next/server";
import executeQuery from "../lib/db";
import { AssessmentResult } from "../lib/models/contents";

export async function getAssessment(id: string) {
  try {
    const query = 'SELECT * FROM results WHERE id = ?';
    const values = [id];

    const result: any = await executeQuery({ query, values });

    if (result.length === 0) {
      return NextResponse.json({ message: 'Not Found' }, { status: 404 });
    }

    let date = new Date(result[0].created_at);

    const assessment: AssessmentResult = {
      id: result[0].id,
      category: result[0].type,
      date: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
      recommendation: result[0].recommendation
    }

    return assessment;
  } catch (error: any) {
    throw new Error(error.message);
  }
}