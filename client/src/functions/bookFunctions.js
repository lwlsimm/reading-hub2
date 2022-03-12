import env from "react-dotenv";
const axios = require('axios');
const path = env.NODE_ENV === "PROD" ? env.PROD_PATH : env.DEV_PATH;

async function searchGoogleBooks(title,author,token) {
    try {
        const request = await axios.post(path+'search',
            {
                token: token,
                title: title,
                author: author
            })

        return await request.data;
    } catch (e) {
        return { success: false}
    }
}

export {searchGoogleBooks}