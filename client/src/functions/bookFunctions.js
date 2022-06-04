import env from "react-dotenv";
const axios = require('axios');
const path = env.NODE_ENV === "production" ? "https://my-reading-hub.herokuapp.com/api/" : env.DEV_PATH;

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
        console.log(e)
        return { success: false}
    }
}

async function createReadingPlan(planDetails,token) {
    try {
        const request = await axios.post(path+'books/create',
            {
                token: token,
                planDetails: planDetails
            })
        return {
            success: request.data.success,
            plan: JSON.parse(request.data.plan),
            book: request.data.book
        };
    } catch (e) {
        return { success: false}
    }
}

async function deleteBookFromServer(token,id) {
    try {
        const request = await axios.post(path+'books/delete',
            {
                token: token,
                book_id: id
            });
        if(request.data.success) {
            return { success: true}
        } else {
            return { success: false}
        }
    } catch (e) {
        return { success: false}
    }
}

async function getMyBooks(token) {
    try {
        const request = await axios.post(path+'books/get',
            {
                token: token,
            })
        const books = [];
        request.data.books.forEach(data => {
            const book = data.bookobject;
            book.plan = data.plan;
            books.push(book)
        });
        return {
            success: request.data.success,
            books: books
        };
    } catch (e) {
        return { success: false}
    }
}

async function savePlanProgress(id,plan,token) {
    try {
        const request = await axios.post(path+'books/update',
            {
                token: token,
                book_id: id,
                plan: plan
            });
        if(request.data.success) {
            return { success: true}
        } else {
            return { success: false}
        }
    } catch (e) {
        return { success: false}
    }
}

async function saveReadingPlan(book,plan,token) {
    try {
        const request = await axios.post(path+'books/save',
            {
                token: token,
                book: book,
                plan: plan
        })
        if(request.data.success) {
            return { success: true}
        } else {
            return { success: false}
        }
    } catch (e) {
        return { success: false}
    }
}

export {searchGoogleBooks, createReadingPlan, saveReadingPlan, getMyBooks,savePlanProgress, deleteBookFromServer}