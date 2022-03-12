import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import {loginUser} from "../functions/loginFunctions";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {login} from "../store/actions";

function LoginComponent () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.loginReducer.loggedIn);

    async function handleLogin(e) {
        e.preventDefault();
        const email = e.target.parentElement.loginEmail.value;
        const password = e.target.parentElement.loginPassword.value;
        const attemptLogin = await loginUser(email, password);
        if(attemptLogin.data.success) {
            dispatch(login(attemptLogin.data));
            navigate('/');
        } else {
            console.log(attemptLogin.message)
        }
    }

        return (
            <div>
                <Form >
                    <Form.Group className="mb-3" controlId="loginEmail">

                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                                      value="abc123@gmail.com"
                                      />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="loginPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                                        value="123abc!!Vb"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit"
                        onClick={event => handleLogin(event)}
                    >
                        Submit
                    </Button>
                </Form>

            </div>
        )
}

export default LoginComponent;

