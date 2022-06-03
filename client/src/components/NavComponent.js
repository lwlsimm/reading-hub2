import {Component} from "react";
import '../css/Nav.css';
import booksImage from '../assets/images/bookshelf.png';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from "react-redux";


function NavComponent () {

    const loggedIn = useSelector(state => state.loginReducer.loggedIn);



    return (
           <div className="outerNav">
                <div className="innerPage innerNav">
                    <div className="navImageContainer">
                        <a href="/"><img src={booksImage} className="navLogo"/></a>
                    </div>
                    <div className="mainHeaderContainer">
                        <a href="/"><h1 className="mainHeader">My Reading Hub</h1></a>
                    </div>
                    <DropdownButton id="dropdown-basic-button" title="Menu" variant="purple">
                        {loggedIn?
                            <Dropdown.Item href="/my-books">My Books</Dropdown.Item>
                            :null}
                        <Dropdown.Item href="#">Settings</Dropdown.Item>
                        <Dropdown.Item
                            href={loggedIn?"/logout":"/login"}
                        >
                            {loggedIn?'Logout':'Login / Register'}
                        </Dropdown.Item>
                    </DropdownButton>
                </div>
           </div>
        )
}

export default NavComponent;
