import { useDispatch, useSelector } from "react-redux";
import {searchGoogleBooks} from "../../functions/bookFunctions";
import { useState} from "react";
import SearchResultViewer from "./SearchResultViewer";
import {addBooks} from "../../store/actions";
import booksSearchReducer from "../../store/booksSearchReducer";


export default function BookSearchComponent() {

    const dispatch = useDispatch();
    const selectedBookFromSearch = useSelector(state => booksSearchReducer.selectedBookFromSearch);
    const [author, setAuthor] = useState('plotkin');
    const [title, setTitle] = useState('opera 101');
    const initialTitle = "Search Google Books";
    const initialClass = "btn btn-success btn-lg btn-block mt-3"
    const [btnTitle, setBtnTitle] = useState(initialTitle);
    const [btnClass, setBtnClass] = useState(initialClass);

    const token = useSelector(state => state.loginReducer.token);

    const bookTitle = selectedBookFromSearch ? selectedBookFromSearch.title : 'Empty';

    async function handleSearch() {
       const searchResults = await searchGoogleBooks(title,author, token);
       if(searchResults.success) {
          dispatch(addBooks(searchResults.books))
       } else {
           setBtnClass("btn btn-warning btn-lg btn-block mt-3");
           setBtnTitle("No Results - Please Try Again!");
           setTimeout(()=> {
                setBtnTitle(initialTitle);
                setBtnClass(initialClass);
           },3500)
       }
    }

    function updateTitle (e) {
        setTitle(e.target.value)
    }

    function updateAuthor (e) {
        setAuthor(e.target.value)
    }

    return(
        <div>
            <form>
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Book Title"
                            onChange={updateTitle} value={title}
                        />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Author Name"
                            onChange={updateAuthor} value={author}/>
                    </div>
                </div>
                <div className="row ">
                    <button type="button" className={btnClass} onClick={handleSearch} >
                        {btnTitle}
                    </button>
                </div>
                <div className="row">
                    <SearchResultViewer mode={'search'}/>
                </div>
            </form>
        </div>
    )
}