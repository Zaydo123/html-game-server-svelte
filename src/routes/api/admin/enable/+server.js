import { db } from '$lib/db.js';
import { json } from '@sveltejs/kit';
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

    const ID = request.url.split('?')[1].split('=')[1];

    if (!ID) {
        return json({
            status: 400,
            body: {
                message: 'ID is required!'
            }
        });
    }

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

