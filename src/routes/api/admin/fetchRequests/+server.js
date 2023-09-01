import { db } from '$lib/db';
import { verifySessionCookie } from '$lib/authUtils';

export async function GET({request}) {
    try {

        if (!verifySessionCookie(request)) {
            return json({
                status: 401,
                body: {
                    message: 'Unauthorized!'
                }
            });
        }

        const result = await db.get('SELECT * FROM requests ORDER BY Date DESC LIMIT 100');

        return new Response(JSON.stringify(result), {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 200
        });

    } catch (err) {
        return new Response("Not Authorized", {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 401
        });
        
    }
}