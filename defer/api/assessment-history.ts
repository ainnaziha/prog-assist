import executeQuery from "../lib/db";

export async function getHistory(userId: number) {
    try {
        const query = 'SELECT * FROM results WHERE user_id = ? ORDER BY id DESC LIMIT 10';
        const values = [userId];

        const result: any = await executeQuery({ query, values });

            const assessments = result.map((item: any) => {
            let date = new Date(item.created_at);

            return {
                id: item.id,
                category: item.type,
                date: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
                recommendation: item.recommendation
            }
        });
        return assessments;
      } catch (error: any) {
        throw new Error(error.message);
      }
}