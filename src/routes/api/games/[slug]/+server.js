import { db } from '$lib/db.js';

export async function GET({ params }) {
    const id = params.slug;

    if (!id) {
        return new Response(JSON.stringify({ error: 'Game ID is required' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    // Construct the SQL query with an added condition for enabled games
    const sql = `
        SELECT * FROM games
        WHERE ID = ? AND Enabled = 1;
    `;

    // Since you're expecting a single game, use a function like "get" (if your db utility provides it)
    const game = await db.get(sql, [id]);

    if (!game) {
        return new Response(JSON.stringify({ error: 'Game not found or not enabled' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return new Response(JSON.stringify(game), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
