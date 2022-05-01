import BookItem from "./BookItem";
import test from '../../assets/data/testSearchObj.json';
import {useSelector} from "react-redux";

export default function SearchResultViewer(props) {

    const searchBooks = useSelector(state => state.booksSearchReducer.books);
    const myBooks = useSelector(state => state.myBooksReducer.myBooks);

    let bookItems = [];

    const books = props.mode === "search"? searchBooks : myBooks;

    for(let i = 0; i < books.length; i++) {
        bookItems.push(<BookItem bookData={books[i]} key={i} mode={props.mode}/>)
    }

    return(
        <div className="d-flex flex-wrap justify-content-center">
            {bookItems}
        </div>
    )
}