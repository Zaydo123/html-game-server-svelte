import { db } from '$lib/db.js';
import { json } from '@sveltejs/kit';


export async function GET(request) {
    // Default values
    const limit = 150;
    let offset = 0;
    let orderBy = "";

    let query = {
        page: request.url.searchParams.get('page'),
        sort: request.url.searchParams.get('sort')
    }

    if (query.page && !isNaN(query.page)) {
        const pageNumber = parseInt(query.page);
        offset = (pageNumber - 1) * limit;
    }

    // Sorting
    if (query.sort) {
        switch (query.sort) {
            case "visits":
                orderBy = "ORDER BY Visits DESC";
                break;
            case "alphabetical":
                orderBy = "ORDER BY Name ASC";
                break;
            case "dateAdded":
                orderBy = 'ORDER BY `Date Added` DESC';
                break;
            default:
                break;
        }
    }
    
    // Pagination

    // Construct the SQL query
    const sql = `
        SELECT * FROM games 
        WHERE Enabled = 1 
        ${orderBy} 
        LIMIT ${limit} 
        OFFSET ${offset}
    `;


    const result = await db.get(sql);

    return json(result);
}
