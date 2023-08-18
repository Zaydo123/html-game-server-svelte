import { db } from '$lib/db.js';
import { json } from '@sveltejs/kit';

export async function POST(request) {

    const ID = request.url.searchParams.get('id');
    console.log('ID:', ID);

    if (!ID) {
        return json({
            status: 400,
            body: {
                message: 'ID is required!'
            }
        });
    }

    const success = db.toggleGameEnabled(ID);

    console.log('Game status updated successfully!');

    if (success) {
        return json({
            status: 200,
            body: {
                message: 'Game status updated successfully!'
            }
        });
    } else {
        return json({
            status: 404,
            body: {
                message: 'Game not found!'
            }
        });
    }
    return json({
        status: 500,
        body: {
            message: 'Something went wrong!'
        }
    });

}
