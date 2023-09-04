import { db } from '$lib/db';
import { verifySessionCookie } from '$lib/authUtils';
import { uploadFileToS3 } from '$lib/cloudflareUtils';

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

        // For non-file data
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

        // For file data
        const gameFiles = values.getAll('gameFiles'); // This will be an array of files
        const gameFilesMetadata = values.getAll('gameFilesMetadata'); // This will be an array of file paths


        for(let i = 0; i < gameFiles.length; i++) {
            const gameFile = gameFiles[i];
            const metadata = gameFilesMetadata[i];
        
            try {
                console.log('Trying to upload game file:', gameFile.name);
                let directories = path.dirname(metadata).split(path.sep);
                directories.shift(); // Remove the game name (e.g., "paperio-2")
                let directory = directories.join(path.sep);
                
                directory = result.insertId + (directory ? '/' + directory : ''); 
                console.log('Directory:', directory);
                uploadFileToS3(directory, Buffer.from(await gameFile.arrayBuffer()), gameFile);
            } catch (error) {
                console.error('Error uploading game file:', error);
            }
        }

        // Handle image upload if it exists
        const imageFile = values.get('image');
        if (imageFile) {
            let id = result.insertId;
            const data = await uploadFileToS3(id, Buffer.from(await imageFile.arrayBuffer()), imageFile);
            let uploadResult = data.result;
            let uploadURL = data.url;
            parsedData.image = uploadURL;
            console.log('Upload URL:', parsedData.image);
        }

        // Update to add image URL
        const updateResult = await db.update(
            "UPDATE games SET Image = ? WHERE id = ?",
            [parsedData.image, result.insertId]
        );

        if(updateResult) {
            console.log('Image URL updated');
        } else {
            console.log('Image URL not updated');
        }

        if (result!=undefined && result.affectedRows > 0) {
            return new Response("Game Created", { status: 201, statusText: "Game Created" });
        } else {
            return new Response("Failed to Create Game", { status: 500, statusText: "Failed to Create Game" });
        }
    } catch (error) {
        console.error('Error creating game:', error);
        return new Response("Error Creating Game", { status: 500, statusText: "Error Creating Game" });
    }
}
