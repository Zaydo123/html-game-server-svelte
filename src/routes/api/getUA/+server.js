import { env } from "$env/dynamic/private";

let CBOM = false;

if(env.CHROMEBOOK_ONLY_MODE !== undefined){
    if(env.CHROMEBOOK_ONLY_MODE.toLowerCase() === "true"){
    CBOM = true;
    }
}
    
export async function GET(data){

    let request = data.request;


    let allowed;

    if(CBOM && request.headers.get("user-agent").toLowerCase().includes("cros")){
        allowed = true;
    } else if(!CBOM){
        allowed = true;
    } else {
        allowed = false;
    }

    return new Response(JSON.stringify({
        "allowed" : allowed,
        "ip": data.getClientAddress() || null,
        "cbom": CBOM
    }), 
    { 
        status: 200,
        headers: { "Content-Type": "application/json" } 
    });

}