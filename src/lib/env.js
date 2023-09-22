// This file is used to store all the environment variables
export const env = {
    //Site Settings ---------------------
    PUBLIC_SITE_NAME: process.env.PUBLIC_SITE_NAME,
    PUBLIC_SHORT_SITE_NAME: process.env.PUBLIC_SHORT_SITE_NAME,
    PUBLIC_SITE_DESCRIPTION: process.env.PUBLIC_SITE_DESCRIPTION,
    PUBLIC_SITE_TITLE: process.env.PUBLIC_SITE_TITLE,
    //Database ---------------------------
    SECRET_DATABASE_URL: process.env.SECRET_DATABASE_URL,
    SECRET_DATABASE_PORT: process.env.SECRET_DATABASE_PORT,
    SECRET_DATABASE_NAME: process.env.SECRET_DATABASE_NAME,
    //USER CREDENTIALS
    SECRET_DATABASE_USER: process.env.SECRET_DATABASE_USER,
    SECRET_DATABASE_PASSWORD: process.env.SECRET_DATABASE_PASSWORD,
    //Admin Login Credentials -----------
    SECRET_ADMIN_USERNAME: process.env.SECRET_ADMIN_USERNAME,
    SECRET_ADMIN_PASSWORD: process.env.SECRET_ADMIN_PASSWORD,
    //Cloudflare R2 Bucket Login Credentials
    SECRET_CLOUDFLARE_ACCESS_KEY_ID: process.env.SECRET_CLOUDFLARE_ACCESS_KEY_ID,
    SECRET_CLOUDFLARE_ACCESS_KEY: process.env.SECRET_CLOUDFLARE_ACCESS_KEY,
    SECRET_CLOUDFLARE_TOKEN_VALUE: process.env.SECRET_CLOUDFLARE_TOKEN_VALUE,
    SECRET_CLOUDFLARE_ENPOINT: process.env.SECRET_CLOUDFLARE_ENPOINT,
    SECRET_CLOUDFLARE_BUCKET_NAME: process.env.SECRET_CLOUDFLARE_BUCKET_NAME,
    SECRET_CLOUDFLARE_BUCKET_URL: process.env.SECRET_CLOUDFLARE_BUCKET_URL,
    //Chromebook Only Mode - If Enabled then only chromebook users can access the site
    CHROMEBOOK_ONLY_MODE: process.env.CHROMEBOOK_ONLY_MODE

};