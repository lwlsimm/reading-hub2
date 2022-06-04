import {Component} from "react";
import '../css/Nav.css';
import booksImage from '../assets/images/bookshelf.png';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";


function NavComponent () {

    const loggedIn = useSelector(state => state.loginReducer.loggedIn);
    const navigate = useNavigate();


    return (
           <div className="outerNav">
                <div className="innerPage innerNav">
                    <div className="navImageContainer">
                        <a onClick={()=>navigate('/')}><img src={booksImage} className="navLogo"/></a>
                    </div>
                    <div className="mainHeaderContainer">
                        <a onClick={()=>navigate('/')}><h1 className="mainHeader">My Reading Hub</h1></a>
                    </div>
                    <DropdownButton id="dropdown-basic-button" title="Menu" variant="purple">
                        {loggedIn?
                            <Dropdown.Item onClick={()=>navigate('/my-books')}>My Books</Dropdown.Item>
                            :null}
                        <Dropdown.Item href="#">Settings</Dropdown.Item>
                        <Dropdown.Item
                            onClick={()=> {
                                if(loggedIn) {
                                    navigate('/logout')
                                } else {
                                    navigate('/login')
                                }
                            }}
                        >
                            {loggedIn?'Logout':'Login / Register'}
                        </Dropdown.Item>
                    </DropdownButton>
                </div>
           </div>
        )
}

export default NavComponent;
