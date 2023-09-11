import { error } from '@sveltejs/kit';
 
/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
    let response = await fetch(`/api/games/${params.slug}`);
    if (!response.ok) {
        throw error(response.status, 'Could not load game');
    } else{
        try{
            let game = await response.json();
            if(game.length == 0){
                console.log('No result found for slug:', params.slug);
                return {
                    status: 404,
                    error: new Error('No result found for slug')
                };

            }
            
            return {
                props: {
                    game: game[0] // since you're accessing the first element with game[0].json() earlier
                }
            };

        } catch(error){
            console.error('Error parsing response JSON:', error);
            return {
                status: 500,
                error: new Error('Error parsing response JSON')
            };
        }


    }

}
