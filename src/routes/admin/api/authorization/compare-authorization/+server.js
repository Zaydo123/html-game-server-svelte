//compare-authoization.js

import { compareSessionCookie } from '$lib/authUtils';



export async function POST({request}) {

    let token = request.headers.get('cookie');
    if(token){
        if(token.includes("session=")){
            token = token.split("session=")[1].split(";")[0];
        }
    } else { 
        return new Response("Invalid token", { status: 401 });
    }
    
    if (typeof token !== "string") {
        return new Response("Invalid body types", { status: 401 });
    }
    if (compareSessionCookie(token)) {
        return new Response("OK", { status: 200 });
    } else {
        return new Response("Invalid token", { status: 401 });
    }
}



