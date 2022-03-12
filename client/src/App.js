import './App.css';
import {Component} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

import NavComponent from './components/NavComponent';
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from './pages/LogoutPage';
import MyAccount from './pages/MyAccount'
import {isTokenValid} from "./functions/loginFunctions";
import {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {login} from "./store/actions";
import AddBook from "./pages/AddBook";

const myStorage = window.localStorage;

export default function App () {

    const dispatch = useDispatch();

    useEffect(async ()=> {
        try {
            const token = await window.localStorage.token;
            if(await token) {
                const tokenStillValid = await isTokenValid(token);
                if(tokenStillValid.isTokenValid) {
                    tokenStillValid.token = token;
                    dispatch(login(tokenStillValid));
                    return;
                }
            }
        } catch {
            return;
        }
    },[])

    return(
            <Router>
                <div>
                    <NavComponent />
                    <div className="innerPage page">
                        <Routes>
                            <Route path='/' element={<LandingPage/>} />
                            <Route path="/login" element={<LoginPage/>} />
                            <Route path="/logout" element={<LogoutPage/>}/>
                            <Route path="/account" element={<MyAccount/>}/>
                            <Route path="/add-book" element={<AddBook/>}/>
                        </Routes>
                    </div>
                </div>
            </Router>
    )
}
