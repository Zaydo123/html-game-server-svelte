import { db } from '$lib/db';

export async function POST({ request }) {
    //update mirrors table with new visit at current url

    let requestURL = request.url;
    requestURL = requestURL.replace("/api/visit", "");

    //make up a name for the site using the URL
    let siteName = requestURL.replace("https://", "");
    siteName = siteName.replace("http://", "");
    siteName = siteName.split(":")[0];
    siteName = siteName.split(".")[0];

    let result = await db.get('SELECT * FROM mirrors WHERE URL = ?', requestURL);
    if(result.length == 0){
        const result = await db.query('INSERT INTO mirrors (URL, Visits) VALUES (?, 1)', requestURL);
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

