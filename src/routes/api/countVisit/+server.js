import { db } from '$lib/db';

export async function POST({ request }) {
    //get body data
    const body = JSON.parse(await request.text());

    if(!body || !body.gameID){ 
        return new Response(JSON.stringify({
            "status": "error",
            "message": "gameID is required"
        }), {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
        });
    } //else if body isnt a number
    else if(isNaN(body.gameID)){
        return new Response(JSON.stringify({
            "status": "error",
            "message": "gameID must be a number"
        }), {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
        });
    }

    //get gameID
    const gameID = body.gameID;

    //get game from db and increment visits by 1
    let sql = 'UPDATE games SET visits = visits + 1 WHERE id = "' +gameID+'"';
    let result = await db.query(sql);

    if(result.affectedRows < 1){
        //send 500 
        return new Response(JSON.stringify({
            "status": "error",
            "message": "gameID not found"
        }), {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            status: 500
        });
        
    }
    return new Response(JSON.stringify({
        "status": "success"
    }), {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        status: 200

    });
    

}