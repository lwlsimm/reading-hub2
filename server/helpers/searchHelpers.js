const axios = require('axios');
const dotenv = require('dotenv')
dotenv.config()

async function bookSearch (req, res, next) {
    try {
        const {title, author} = req.body;
        if(!title || !author) throw new Error('Search must include title and author');
        const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
        const path = `https://www.googleapis.com/books/v1/volumes?q=${covertSearchString(title)}+inauthor:${covertSearchString(author)}&key=${apiKey}&maxResults=25`;
        const serverData = await axios.get(path);
        const books = createBookArray(serverData.data.items);
        if(books.length) {
            req.body.success = true;
            req.body.books = books;
        } else {
            req.body.success = false;
        }
        next();
    } catch (error) {
        res.status(401).send(error.message);
    }
}

const createBookArray = (bookData) => {
    const books = [];
    bookData.forEach(item => {
        const book = {
            id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors[0],
            description: item.volumeInfo.description,
            published: item.volumeInfo.publishedDate,
            images: item.volumeInfo.imageLinks
        }
        books.push(book);
    })
    return books;
}

const covertSearchString = (string) => {
    let searchParams = (string).toLowerCase();
    searchParams = searchParams.replaceAll(/[.,\/#'!$%\^&\*;:{}=\-_`~()]/g,"")
    searchParams = searchParams.replaceAll(" ", "+");
    return searchParams;
}

exports.bookSearch = bookSearch;