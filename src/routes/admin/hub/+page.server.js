import { db } from '$lib/db.js';

//fetch all games from server (limit 150)

function getGames() {
    return db.get('SELECT * FROM games LIMIT 150');
}

//send all games to client
export async function load() {
    const result = await getGames();
    return {
        games: result
    };
}
