import { env } from '$env/dynamic/public';
import { json } from '@sveltejs/kit';

//get request and format as json
export async function GET(request) {
    
    let websiteTitle = env.PUBLIC_SITE_TITLE;

    if(request.cookies.get('title') != undefined){
        websiteTitle = request.cookies.get('title');
    }

    return json({
        name: env.PUBLIC_SITE_NAME,
        shortName: env.PUBLIC_SHORT_SITE_NAME,
        description: env.PUBLIC_SITE_DESCRIPTION,
        title: websiteTitle,
        adsenseClientID: env.PUBLIC_ADSENSE_CLIENT_ID
    });
}


