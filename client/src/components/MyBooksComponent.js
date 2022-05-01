import {useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import BookItem from "./BookSearch/BookItem";
import SearchResultViewer from "./BookSearch/SearchResultViewer";

export default function BookSearchComponent() {

    const myBooks = useSelector(state => state.myBooksReducer.myBooks);

    function Display() {
        if(myBooks.length) {
            return <SearchResultViewer mode={'myBooks'}/>
        } else {
            return <h3 className='text-center'>Add some books to your collection!</h3>
        }
    }

    return(
        <div>
            <Display/>
        </div>
    )
}