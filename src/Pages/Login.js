import { Container, Form, Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { setToken } from '../Components/token';
import { useNavigate } from 'react-router-dom';
import { LoginCtx } from '../Contexts/LoginContext';

export default function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(LoginCtx);
    const [response, setResponse] = useState(null);
    const [spinner, setSpinner] = useState(false);
    const [formData, setFormData] = useState({
        email:"",
        password:""
    });

    function updateFormData(e){
        const name = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [name]:value });
    };

    async function login() {
        const url = "http://localhost:5000/api/v1/auth/login";
        const options = {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify(formData)
        };

        setSpinner(true);
        const response = await fetch(url, options);
        const result = await response.json();
        setSpinner(false);
        setResponse(result);

        if (response.status === 200) {
            setToken(result.token);
            setUser(result.user);
            //TODO: redirect the user to his dashboard
            navigate("/");
        };
    };

    return(
        <>
            <Container fluid="xl" className="p-3">
             {
                spinner ? <h6>Loading...</h6> : null
             }
                <h2 className="text-center my-2">Login</h2>
                 {
                    response && 
                    response.message ?
                    <h6 className="message my-3 p-3">
                        {response.message}
                    </h6> 
                    : null
                }
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" onChange={(e)=>updateFormData(e)} type="email" placeholder="Enter your email address" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control  name="password" onChange={(e)=>updateFormData(e)} type="password" placeholder="Password" />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button onClick={login} variant="danger" type="button">
                            Login
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    );
};
