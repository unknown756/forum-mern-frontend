import { Container,Button, Form  } from 'react-bootstrap';

export default function SearchBar() {
    return(
        <Container className="w-100 p-3">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Search threads" />
                </Form.Group>
            </Form>
            <div className="d-grid gap-2">
                <Button className="text-center" variant="danger">Search</Button>
            </div>
        </Container> 
    );
};

