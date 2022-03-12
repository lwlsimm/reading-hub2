import BookItem from "./BookItem";
import test from '../../assets/data/testSearchObj.json';
import {useSelector} from "react-redux";

export default function SearchResultViewer(props) {

    let bookItems = [];
    const books = useSelector(state => state.booksReducer.books);

    for(let i = 0; i < books.length; i++) {

        bookItems.push(<BookItem bookData={books[i]} key={i}/>)
    }

    // let bookItems = [];
    // for(let i = 0; i < test.length; i++) {
    //     console.log(typeof test)
    //     bookItems.push(<BookItem bookData={test[i]} key={i}/>)
    // }

    return(
        <div className="d-flex flex-wrap justify-content-center">
            {bookItems}
        </div>
    )
}