import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function Forumpage() {
    const [frm, setForum] = useState(null);
    const [spinner, setSpinner] = useState(true);
    const { slug } = useParams();

    useEffect(() => {
        const getForum = async () => {
            const url = "http://127.0.0.1:5000/api/v1/forums/" + slug
            const response = await fetch(url);
            const data = await response.json();
            setForum(data.data);
            setSpinner(false)
        }
        getForum()
    }, []);

    if (spinner) return( 
             <h3>Loading...</h3> 
    )
    return (
        <Container className="p-2">
            <h5 className="text-center"> { frm.question }</h5>
            <p className="my-2">{ frm.description }</p>
            <hr/>
            <span className="text-muted">{new Date(frm.createdAt).toDateString()}</span>
        </Container>
    )
};
