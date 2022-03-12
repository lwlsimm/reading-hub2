import {combineReducers} from 'redux';

import loginReducer from "./loginReducer";
import booksReducer from "./booksReducer";

const rootReducer = combineReducers({
    loginReducer: loginReducer,
    booksReducer: booksReducer
})

export default rootReducer;