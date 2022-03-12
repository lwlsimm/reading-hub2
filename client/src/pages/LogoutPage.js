import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {logoutUser} from "../functions/loginFunctions";
import {useNavigate} from "react-router-dom";
import {logout} from "../store/actions";

function Logout () {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(async ()=> {
        dispatch(logout())
        const loggingOut = await logoutUser();
        navigate('/login');
    },[])

    return(<div></div>)

}

export default Logout;