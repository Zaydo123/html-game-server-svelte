import { db } from '$lib/db';
import { verifySessionCookie } from '$lib/authUtils';
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
        parsedData.dateAdded = formatDateToSQL(parsedData.dateAdded);

        console.log('Parsed Data:', parsedData);

        // Handle image upload if it exists
        if (parsedData.image) {
            const file = parsedData.image;
            const savePath = path.join(process.cwd(), 'static', 'images', 'game_images', file.name);
            fs.writeFileSync(savePath, Buffer.from(await file.arrayBuffer()));
            parsedData.image = `/images/game_images/${file.name}`;
        }

        // Update the game data in the database
        const result = await db.update(
            "UPDATE games SET Name = ?, Image = ?, `Date Added` = ?, Visits = ?, gamedistribution = ?, Extra = ?, Enabled = ? WHERE id = ?",
            [parsedData.name, parsedData.image, parsedData.dateAdded, parsedData.visits, parsedData.gamedistribution, parsedData.extra, parsedData.enabled, parsedData.id]
        );

        console.log('Result:', result);

        if (result && result.changedRows > 0) {
            return new Response("Game Updated", { status: 200, statusText: "Game Updated" });
        } else {
            return new Response("Game Not Updated", { status: 500, statusText: "Game Not Updated" });
        }
    } catch (error) {
        console.error('Error updating game:', error);
        return new Response("Error Updating Game", { status: 500, statusText: "Error Updating Game" });
    }
}
