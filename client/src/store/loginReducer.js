const initialState = {
    loggedIn: false,
    token: null,
    email: null,
    id: null
}

const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'login/login': {
            return {loggedIn: true, token: action.payload['token'], email: action.payload['email'], id: action.payload['id']}
        }
        case 'login/logout': {
            return initialState;
        }
        default: {
            return state;
        }
    }
}

export default loginReducer;