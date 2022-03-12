import {Component} from "react";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";


function Login () {

    return (
            <div>
                <Tabs
                    defaultActiveKey="login"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="login" title="Login">
                        <LoginComponent/>
                    </Tab>
                    <Tab eventKey="register" title="Register">
                        <RegisterComponent />
                    </Tab>

                </Tabs>
            </div>
        )
}

export default Login;