import BookItem from "./BookItem";
import test from '../../assets/data/testSearchObj.json';
import {useSelector} from "react-redux";

export default function SearchResultViewer(props) {

    const searchBooks = useSelector(state => state.booksSearchReducer.books);
    const myBooks = useSelector(state => state.myBooksReducer.myBooks);

    let bookItems = [];
    let finishedBooks = []

    const books = props.mode === "search"? searchBooks : myBooks;


    for(let i = 0; i < books.length; i++) {
        if(props.mode === "search") {
            bookItems.push(<BookItem bookData={books[i]} key={i} mode={props.mode}/>)
            continue;
        }
        let addBook = false;
        books[i].plan.map(b=>{
            if(!b.completed) addBook = true
        });
        if(addBook) {
            bookItems.push(<BookItem bookData={books[i]} key={i} mode={props.mode}/>)
        } else {
            finishedBooks.push(<BookItem bookData={books[i]} key={i} mode={props.mode}/>)
        }
    }


    const MyDisplay = () => {
        if(props.mode==="search") {
            return(
                <div className="d-flex flex-wrap justify-content-center">
                    {bookItems}
                </div>
            )
        } else {
            return(
                    <div>
                        <h6 className="text-center">Currently Reading</h6>
                        <div className="d-flex flex-wrap justify-content-center">
                            {bookItems}
                        </div>
                        <h6 className="text-center">Finished Reading</h6>
                        <div className="d-flex flex-wrap justify-content-center">
                            {finishedBooks}
                        </div>
                    </div>)
        }


    }

    return(
        <div >
            <MyDisplay/>
        </div>
    )
}