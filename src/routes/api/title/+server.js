import { PUBLIC_SITE_NAME, PUBLIC_SHORT_SITE_NAME, PUBLIC_SITE_DESCRIPTION, PUBLIC_SITE_TITLE, PUBLIC_ADSENSE_CLIENT_ID} from '$env/dynamic/public';
import { json } from '@sveltejs/kit';

//get request and format as json
export async function GET(request) {
    
    let websiteTitle = process.env.PUBLIC_SITE_TITLE;

    if(request.cookies.get('title') != undefined){
        websiteTitle = request.cookies.get('title');
    }

    return json({
        name: process.env.PUBLIC_SITE_NAME,
        shortName: process.env.PUBLIC_SHORT_SITE_NAME,
        description: process.env.PUBLIC_SITE_DESCRIPTION,
        title: websiteTitle,
        adsenseClientID: process.env.PUBLIC_ADSENSE_CLIENT_ID
    });
}


