

const initialState = {
    books: [],
    selectedBookFromSearch: {
        title: null,
    },
    selectedBookForReadingPlan: {

    }
}

const booksSearchReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'booksSearch/addBooks': {
            return { ...state, books: action.payload }
        }
        case 'booksSearch/clearBooks': {
            return initialState;
        }
        case 'booksSearch/addSelectedBookFromSearch': {
             return { ...state, selectedBookFromSearch: action.payload }
        }
        case 'booksSearch/clearSelectedBookFromSearch': {
            return {...state, selectedBookFromSearch: {title: null}}
        }
        case 'booksSearch/addSelectedBookForReadingPlan': {
            return { ...state, selectedBookForReadingPlan: action.payload }
        }
        case 'booksSearch/clearSelectedBookForReadingPlan': {
            return {...state, selectedBookForReadingPlan: {}}
        }
        default: {
            return state;
        }
    }
}

export default booksSearchReducer;