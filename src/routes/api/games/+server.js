import { db } from '$lib/db.js';
import { json } from '@sveltejs/kit';

export async function GET(request) {
    const limit = 150;
    let offset = 0;
    let orderBy = "";  // Default order
    let enabledGamesOnly = "AND Enabled = 1";
    let params = [];

    const query = {
        page: request.url.searchParams.get('page'),
        sort: request.url.searchParams.get('sort'),
        search: request.url.searchParams.get('search'),
        showDisabled: request.url.searchParams.get('showDisabled'),
    };

    if (query.showDisabled === 'true') {
        enabledGamesOnly = "";  // Show both enabled and disabled games
    }

    if (query.page && !isNaN(query.page)) {
        const pageNumber = parseInt(query.page);
        offset = (pageNumber - 1) * limit;
    }

    // Sorting
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

    let searchCondition = "";
    if (query.search) {
        searchCondition = " AND Name LIKE ?";
        params.push(`%${query.search}%`);
    }

    // Construct the SQL query
    let sql = `
        SELECT * FROM games
        WHERE 1=1
        ${enabledGamesOnly}
        ${searchCondition}
        ${orderBy}
        LIMIT ?
        OFFSET ?;
    `;


    // Add limit and offset to the parameters array
    params.push(limit, offset);
    
    const result = await db.get(sql, params);
    
    return json(result);
}
