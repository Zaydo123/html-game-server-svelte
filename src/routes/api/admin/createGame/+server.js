import { db } from '$lib/db';
import { verifySessionCookie } from '$lib/authUtils';
import {uploadFileToS3} from '$lib/cloudflareUtils';
import fs from 'fs';
import path from 'path';

// Helper function to structure form data
function formBody(body) {
    return [...body.entries()].reduce((data, [k, v]) => {
        let value = v;
        if (v === "true") value = true;
        if (v === "false") value = false;
        if (!isNaN(Number(v))) value = Number(v);
        if (k in data) {
            const val = data[k];
            value = Array.isArray(val) ? [...val, value] : [val, value];
        }
        data[k] = value;
        return data;
    }, {});
}

function formatDateToSQL(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export async function POST({ request }) {
    try {
        // First, verify if the session cookie is valid
        if (!verifySessionCookie(request)) {
            return new Response("Not Authenticated", { status: 401, statusText: "Not Authenticated" });
        }

        const values = await request.formData();
        const parsedData = formBody(values);

        // Format the date to SQL format
        if(parsedData.dateAdded) {
            parsedData.dateAdded = formatDateToSQL(parsedData.dateAdded);
        }

        if(parsedData.enabled === true || parsedData.enabled === false) {
            parsedData.enabled = parsedData.enabled ? 1 : 0;
        }

        
        // Insert the new game data into the database
        const result = await db.query(
            "INSERT INTO games (Name, `Date Added`, Visits, gamedistribution, Extra, Enabled) VALUES (?, ?, ?, ?, ?, ?)",
            [parsedData.name, parsedData.dateAdded, parsedData.visits, parsedData.gamedistribution, parsedData.extra, parsedData.enabled]
            );
            
            // Handle image upload if it exists
            if (parsedData.image) {

                let id = result.insertId;
                const file = parsedData.image;
                const data = await uploadFileToS3(id, Buffer.from(await file.arrayBuffer()),file);
                let uploadResult = data.result;
                let uploadURL = data.url;
                parsedData.image = uploadURL;
                console.log('Upload URL:', parsedData.image);
            }

            //update to add image url
            const updateResult = await db.update(
                "UPDATE games SET Image = ? WHERE id = ?",
                [parsedData.image, result.insertId]
                );
            
            if(updateResult) {
                console.log('Image URL updated');
            } else {
                console.log('Image URL not updated');
            }



        
            if (result && result.lastID) {
            return new Response("Game Created", { status: 201, statusText: "Game Created" });
        } else {
            return new Response("Failed to Create Game", { status: 500, statusText: "Failed to Create Game" });
        }
    } catch (error) {
        console.error('Error creating game:', error);
        return new Response("Error Creating Game", { status: 500, statusText: "Error Creating Game" });
    }
}
