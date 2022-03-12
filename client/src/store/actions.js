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
        type: 'books/addBooks',
        payload: item
    }
}

export const clearBooks = () => {
    return {
        type: 'books/clearBooks'
    }
}

export const addSelectedBookFromSearch = item => {
    return {
        type: 'books/addSelectedBookFromSearch',
        payload: item
    }
}

export const clearSelectedBookFromSearch = () => {
    return {
        type: 'books/clearSelectedBookFromSearch'
    }
}

export const addSelectedBookForReadingPlan = (item) => {
    return {
        type: 'books/addSelectedBookForReadingPlan',
        payload: item
    }
}

export const clearSelectedBookForReadingPlan = () => {
    return {
        type: 'books/clearSelectedBookForReadingPlan'
    }
}