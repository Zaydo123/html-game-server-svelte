
//const bcrypt = require('bcryptjs');
import * as bcrypt from "bcryptjs";
import { adminAuthCookie } from '$lib/stores';

// Hash a password
function hashPassword(plainPassword) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainPassword, salt);
}

// Verify a password against a hash
function verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
}

function generateSessionToken() {
    const token = crypto.getRandomValues(new Uint32Array(4)).join('-');
    adminAuthCookie.set(token);
    return token;
}

function generateSessionCookie() {
    const token = generateSessionToken();
    const cookie = `session=${token}; Path=/; HttpOnly; Secure; SameSite=Strict Max-Age=3600000`;
    return cookie;
}


function compareSessionCookie(token) {
    let storedToken;
    adminAuthCookie.subscribe(value => {
        storedToken = value;
    });

    return token === storedToken;
}


function verifySessionCookie(request) {
    // Get the session cookie from the request

    let sessionCookie;
    if (request.headers && typeof request.headers.get === 'function') {
        // If headers is a Map
        sessionCookie = request.headers.get('cookie');
    } else if (request.headers && request.headers.cookie) {
        // If headers is an object
        sessionCookie = request.headers.cookie;
    }

    if (!sessionCookie) {
        return false;
    }
    
    if(sessionCookie.includes("session=")){
        sessionCookie = sessionCookie.split("session=")[1].split(";")[0];
    }

    // Get the value from the adminAuthCookie store
    let storedCookieValue;
    const unsubscribe = adminAuthCookie.subscribe(value => {
        storedCookieValue = value;
    });
    unsubscribe(); // Unsubscribe after getting the value

    // Check if the session cookie matches the stored value
    return sessionCookie === storedCookieValue;
}





export { hashPassword, verifyPassword, generateSessionCookie, generateSessionToken, verifySessionCookie, compareSessionCookie };