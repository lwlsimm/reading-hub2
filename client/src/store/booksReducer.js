

const initialState = {
    books: [],
    selectedBookFromSearch: {
        title: '!Empty-Selected-Book!',
    },
    selectedBookForReadingPlan: {

    }
}

const booksReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'books/addBooks': {
            return { ...state, books: action.payload }
        }
        case 'books/clearBooks': {
            return initialState;
        }
        case 'books/addSelectedBookFromSearch': {
             return { ...state, selectedBookFromSearch: action.payload }
        }
        case 'books/clearSelectedBookFromSearch': {
            return {...state, selectedBookFromSearch: {title: '!Empty-Selected-Book!'}}
        }
        case 'books/addSelectedBookForReadingPlan': {
            return { ...state, selectedBookForReadingPlan: action.payload }
        }
        case 'books/clearSelectedBookForReadingPlan': {
            return {...state, selectedBookForReadingPlan: {}}
        }
        default: {
            return state;
        }
    }
}

export default booksReducer;