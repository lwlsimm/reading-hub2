import {combineReducers} from 'redux';

import loginReducer from "./loginReducer";
import booksSearchReducer from "./booksSearchReducer";
import myBooksReducer from "./myBookReducer";

const rootReducer = combineReducers({
    loginReducer: loginReducer,
    booksSearchReducer: booksSearchReducer,
    myBooksReducer: myBooksReducer
})

export default rootReducer;