import { PUBLIC_ADSENSE_CLIENT_ID, PUBLIC_ADSENSE_GAME_SIDES_SLOT_ID } from '$env/dynamic/public';
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
    let game = await db.get(sql, [id]);
    if (game && game.length > 0) {
        game[0].adsense = {
            client: process.env.PUBLIC_ADSENSE_CLIENT_ID,
            slot: process.env.PUBLIC_ADSENSE_GAME_SIDES_SLOT_ID
        };
    }
    
    return new Response(JSON.stringify(game), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
