import { db } from '$lib/db';
import { verifySessionCookie } from '$lib/authUtils';

export async function POST({request}) {
    try {
        // First, verify if the session cookie is valid
        if (!verifySessionCookie(request)) {
            return  new Response({
                status: 401,
                body: { error: 'Not Authenticated' }
            });
        }


        // Get the game ID from the request body
        
        let reader = request.body.getReader();
        let { done, value } = await reader.read();
        let text = new TextDecoder("utf-8").decode(value);
        let body = JSON.parse(text);
        const id = body.id;
        


        if (!id) {
            return new Response({
                status: 400,
                body: { error: 'Game ID is required' }
            });
        }

        // Delete the game data from the database
        const result = await db.query(
            "DELETE FROM games WHERE id = ?", [id]
        );
            


        if (result && result.changes > 0) {
            return new Response({
                status: 200,
                body: { message: 'Game Deleted' }
            });
        } else {
            return new Response({
                status: 404,
                body: { error: 'Game Not Found' }
            });
        }

    } catch (error) {
        console.log('Error:', error);
        console.error('Error deleting game:', error);
        return {
            status: 500,
            body: { error: 'Error Deleting Game' }
        };
    }
}
