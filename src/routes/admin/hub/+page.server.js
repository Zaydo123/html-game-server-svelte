import { db } from '$lib/db.js';
import { verifySessionCookie } from '$lib/authUtils';



function getGames() {
    return db.get('SELECT * FROM games LIMIT 150');
}


//send all games to client
//dont load page if user is not authenticated
export async function load({request}) {

    if (!verifySessionCookie(request)) {
       //redirect to login page
       console.log("Not Authenticated");
        return {
            status: 302,
            games : ["Not Authenticated"],
        };
    }
    const result = await getGames();
    return {
        status: 200,
        games: result
    };
}
