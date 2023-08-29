import { PUBLIC_SITE_NAME, PUBLIC_SHORT_SITE_NAME, PUBLIC_SITE_DESCRIPTION, PUBLIC_SITE_TITLE } from '$env/static/public';
import { json } from '@sveltejs/kit';

//get request and format as json
export async function GET(request) {
    
    let websiteTitle = PUBLIC_SITE_TITLE;

    if(request.cookies.get('title') != undefined){
        websiteTitle = request.cookies.get('title');
    }

    return json({
        name: PUBLIC_SITE_NAME,
        shortName: PUBLIC_SHORT_SITE_NAME,
        description: PUBLIC_SITE_DESCRIPTION,
        title: websiteTitle
    });
}


