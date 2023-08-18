import { db } from '$lib/db.js';
import { json } from '@sveltejs/kit';


//get all games from db
export async function GET() {
    const result = await db.get('SELECT * FROM games WHERE Enabled = 1 LIMIT 150 ');
    return json(result);
}