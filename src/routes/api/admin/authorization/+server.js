
import { SECRET_ADMIN_USERNAME, SECRET_ADMIN_PASSWORD } from '$env/dynamic/private';
import { hashPassword, verifyPassword, generateSessionCookie, generateSessionToken } from '$lib/authUtils';
import { adminAuthCookie } from '$lib/stores';
// This should be done once when the server starts, not every time you verify a password
const hashedAdminPassword = hashPassword(process.env.SECRET_ADMIN_PASSWORD);

function authenticate(username, password) {
    if (username === process.env.SECRET_ADMIN_USERNAME && verifyPassword(password, hashedAdminPassword)) {
        // User is authenticated
        return true;
    } else {
        // Invalid credentials
        return false;
    }
}

export async function POST({request}) {

    //read the request body
    const reader = request.body.getReader();
    //read the data from the request body
    const { done, value } = await reader.read();
    //decode the data and convert it to a string
    const text = new TextDecoder("utf-8").decode(value);
    //parse the string into a JSON object
    const body = JSON.parse(text);
    //destructure the username and password from the JSON object
    const { username, password } = body;
    
    if (typeof username !== "string" || typeof password !== "string") {
        return new Response("Invalid body types", { status: 401 });
    }
    
    if (authenticate(username, password)) {
        // User is authenticated. give them a browser cookie
        const cookie = generateSessionCookie();
        return new Response("OK", { status: 200, headers: { "Set-Cookie": cookie } });

    } else {
        // Invalid credentials
        return new Response("Invalid credentials", { status: 401 });
    }



}