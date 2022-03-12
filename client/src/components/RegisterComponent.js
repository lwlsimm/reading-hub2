import {Component} from "react";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
const { registerNewUser } = require('../functions/loginFunctions');

function RegisterComponent () {

        return (
            <div>
                <Form>
                    <Form.Group className="mb-3" controlId="registerEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="registerName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name (optional)" />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="registerPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="passwordConfirm" placeholder="Confirm Password" />
                    </Form.Group>

                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>
                </Form>

            </div>
        )
}

export default RegisterComponent;