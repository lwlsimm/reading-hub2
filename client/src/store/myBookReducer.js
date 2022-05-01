const initialState = {
    myBooks: {},
    selectedMyBook: { title: null}
}

const myBooksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'myBooks/addMyBooksFromServer': {
            return { ...state, myBooks: action.payload }
        }
        case 'myBooks/addSelectedMyBook' : {
            return {...state, selectedMyBook: action.payload}
        }
        case 'myBooks/clearSelectedMyBook': {
            return {...state, selectedMyBook: {title: null}}
        }
        default: {
            return state;
        }
    }
}


export default myBooksReducer;