//The POST function is called when a POST request is made to the api/visit endpoint. This function is responsible for incrementing the number of visits for a specific mirror in the database. The function takes the URL of the mirror from the request, and queries the database for a row where the URL matches the request URL. If there is no match, then the function will return a 404 error. If a match is found, then the function will increment the number of visits for that row by 1.
import { db } from '$lib/db';

export async function POST({ request }) {
    let requestURL = request.url;
    requestURL = requestURL.replace("/api/visit", "");
    let result = await db.get('SELECT * FROM mirrors WHERE URL = ?', requestURL);

    if(result.length == 0){
        console.log('No result found for URL:', requestURL);
        return new Response(JSON.stringify({"result": "error", "message": "No result found for URL"}), {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 404
        });

    }

    //if request.url is in the database, increment the visit count
    result = await db.query('UPDATE mirrors SET Visits = Visits + 1 WHERE URL = ?', requestURL);
    return new Response(JSON.stringify({"result": "success"}), {
        headers: {
            'Content-Type': 'application/json'
        },
        status: 200
    });

}

