export const login = item => {
    return {
        type: 'login/login',
        payload: item
    }
}

export const logout = () => {
    return {
        type: 'login/logout'
    }
}

export const addBooks = item => {
    return {
        type: 'booksSearch/addBooks',
        payload: item
    }
}

export const clearBooks = () => {
    return {
        type: 'booksSearch/clearBooks'
    }
}

export const addSelectedBookFromSearch = item => {
    return {
        type: 'booksSearch/addSelectedBookFromSearch',
        payload: item
    }
}

export const clearSelectedBookFromSearch = () => {
    return {
        type: 'booksSearch/clearSelectedBookFromSearch'
    }
}

export const addSelectedBookForReadingPlan = (item) => {
    return {
        type: 'booksSearch/addSelectedBookForReadingPlan',
        payload: item
    }
}

export const clearSelectedBookForReadingPlan = () => {
    return {
        type: 'booksSearch/clearSelectedBookForReadingPlan'
    }
}

export const addMyBooksFromServer = item => {
    return {
        type: 'myBooks/addMyBooksFromServer',
        payload: item
    }
}

export const addSelectedMyBook = item => {
    return {
        type: 'myBooks/addSelectedMyBook',
        payload: item
    }
}

export const clearSelectedMyBook = () => {
    return {
        type: 'myBooks/clearSelectedMyBook'
    }
}