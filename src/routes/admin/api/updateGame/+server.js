import { db } from '$lib/db';
import { verifySessionCookie } from '$lib/authUtils';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Configure multer for image upload
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

export async function POST({request}) {

    //TODO
    //come back later. problems with reading request body
    //
    //
    //



    try {
        // First, verify if the session cookie is valid
        if (!verifySessionCookie(request)) {
            return new Response("Not Authenticated", {status: 401, statusText: "Not Authenticated"});
        }

        // Convert the readable stream to a JavaScript object
        const rawData = await request.body.json();
        let gameData = { ...rawData };

        console.log("------------------");
        console.log(gameData);

        // Handle image upload if it exists
        if (request.files && request.files.image) {
            const file = request.files.image;
            const savePath = path.join(process.cwd(), 'static', 'images', 'game_images', file.originalname);
            fs.writeFileSync(savePath, file.buffer);
            // Update the gameData.image with the new path
            gameData.image = `/images/game_images/${file.originalname}`;
        }

        // Update the game data in the database
        const result = await db.update(
            "UPDATE games SET Name = ?, Image = ?, `Date Added` = ?, Visits = ?, gamedistribution = ?, Extra = ?, Enabled = ? WHERE id = ?",
            [gameData.name, gameData.image, gameData.dateAdded, gameData.visits, gameData.gamedistribution, gameData.extra, gameData.enabled, gameData.id]
        );

        console.log(result);

        if (result > 0) { //result = changedRows
            return new Response("Game Updated", {status: 200, statusText: "Game Updated"});
        } else {
            return new Response("Game Not Updated", {status: 500, statusText: "Game Not Updated"});
        }
    } catch (error) {
        console.error('Error updating game:', error);
        return new Response("Error Updating Game", {status: 500, statusText: "Error Updating Game"});
    }
}
