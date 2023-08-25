import { error } from '@sveltejs/kit';
 
/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
    let response = await fetch(`/api/games/${params.slug}`);
    if (!response.ok) {
        throw error(response.status, 'Could not load game');
    }

    const game = await response.json();
    if (!game) {
        throw error(404, 'Not found');
    }

    return {
        props: {
            game: game[0] // since you're accessing the first element with game[0].json() earlier
        }
    };
}
