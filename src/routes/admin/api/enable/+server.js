import { db } from '$lib/db.js';
import { json } from '@sveltejs/kit';
import { adminAuthCookie } from '$lib/stores';
import { verifySessionCookie } from '$lib/authUtils';

export async function POST({request}) {

    if (!verifySessionCookie(request)) {
        return json({
            status: 401,
            body: {
                message: 'Unauthorized!'
            }
        });
    }
    
    const ID = request.url.searchParams.get('id');

    if (!ID) {
        return json({
            status: 400,
            body: {
                message: 'ID is required!'
            }
        });
    }

    const success = db.toggleGameEnabled(ID);

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

