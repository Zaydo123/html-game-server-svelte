import { CHROMEBOOK_ONLY_MODE } from "$env/static/private";

let CBOM = false;

if(CHROMEBOOK_ONLY_MODE.toLowerCase() === "true"){
    CBOM = true;
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