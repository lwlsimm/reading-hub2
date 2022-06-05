import env from "react-dotenv";

const axios = require('axios');
const myStorage = window.localStorage;
const path = env.NODE_ENV === "DEV" ? env.DEV_PATH:"https://my-reading-hub.herokuapp.com/api/" ;


function registerNewUser () {

}
async function logoutUser() {
        const token = myStorage.getItem('token');
        myStorage.setItem('token',null);
        const destroyToken = await axios.post(path + 'login/logout', {
            token: token
        });
        return destroyToken.data;
}

async function isTokenValid(token) {
    try {
        const tokenRequest = await axios.post(path +'login/read-token', {
            token: token
        });
        if(await  tokenRequest.data.isTokenValid) {
            return await tokenRequest.data;
        } else {
            return {isTokenValid: false};
        }
    } catch (e) {
        return {isTokenValid: false};
    }
}

async function loginUser(email, password) {
    try {
        console.log(env.NODE_ENV)
        const emailIsValid = isEmailValid(email);
        if(!emailIsValid) {
            throw new Error('The email is not in a valid format.  Please try again');
        } else {
            const loginAttempt = await axios.post(path+'login',{
                email:email,
                password: password
            });
            if(await loginAttempt.data.success) {
                localStorage.setItem('token', loginAttempt.data.token);
                return {
                    data: loginAttempt.data
                }
            }
        }
    } catch(e) {
        return {
            data: {
                success: false,
                message: e.message,
            }

        }
    }

}

function isEmailValid(email) {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(email);
}

export {registerNewUser,loginUser,isEmailValid, isTokenValid, logoutUser}