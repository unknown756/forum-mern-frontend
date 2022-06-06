import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

// Context
import { LoginCtx } from '../Contexts/LoginContext';


export default function NavBar() {
    const { user } = useContext(LoginCtx);
    const linkStyle = {
        textDecoration:"none",
        margin:"1rem 0.5rem",
        color: "whitesmoke"
    }
    const brandStyle = {
        color:"whitesmoke",
        textDecoration:"none",
        margin:"0.8rem 1.5rem 0.8rem 0.8rem"
    };
    return (
        <Navbar bg="dark" variant="dark" expand="md">
            <Container>
                <Link style={brandStyle} to="/">
                    <h5>Get Answered</h5>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        { user ? <Link style={linkStyle} to="/dashboard">
                            Dashboard</Link>  :
                        <Nav className="me-auto">
                            <Link style={linkStyle} to="/">Home</Link>
                            <Link style={linkStyle} to="/login">Login</Link>
                            <Link style={linkStyle} to="/signup">SignUp</Link>
                        </Nav> }
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};


