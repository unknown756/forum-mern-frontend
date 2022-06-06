import { useState, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { setToken } from '../Components/token';
import { useNavigate } from 'react-router-dom';
import { LoginCtx } from '../Contexts/LoginContext';

export default function Signup() {
    const navigate = useNavigate();
    const { setUser } = useContext(LoginCtx);
    const [response, setResponse] = useState(null);
    const [spinner, setSpinner] = useState(null);
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    });

    function updateFormData(e){
        const name = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [name]:value });
    };
    
    async function signup(){
        const url = "http://127.0.0.1:5000/api/v1/auth/signup";
        const options = {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(formData)
        };

        setSpinner(true);
        const response = await fetch(url, options);
        const result = await response.json();
        setSpinner(false);
        setResponse(result);

        if (response.status === 200){
            setToken(result.token);
            setUser(result.user);
            //TODO: redirect the user to his dashboard
            navigate("/")
        };

    };

    return(
        <>
            <Container fluid="md" className="p-3">
                {
                    spinner ? <h6>Loading...</h6> : null
                }
                <h2 className="text-center my-2">Signup</h2>
                {
                    response && 
                    response.message ?
                    <h6 className="message my-3 p-3">
                        {response.message}
                    </h6> 
                    : null
                }
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" onChange={(e)=> updateFormData(e)} type="text" placeholder="Name e.g Elliot Anderson" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" onChange={(e)=>updateFormData(e)} type="email" placeholder="Enter your email address" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" onChange={(e)=>updateFormData(e)} type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control name="confirmPassword" onChange={(e)=>updateFormData(e)} type="password" placeholder="Confirm Password" />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button onClick={signup} variant="danger"type="button">
                            Signup
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    );
};
