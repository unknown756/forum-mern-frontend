import { Container } from 'react-bootstrap';
import { 
    BsFillCaretUpFill,
    BsFillChatRightFill
} from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function Card(props) {
    const { 
        question,
        description,
        category, 
        createdAt, 
        likes, 
        comments,
        slug
    } = props.forum
    return (
        <Container className="w-100 p-3">
            <Link style={{textDecoration:"none"}} to={ "/forums/" + slug }>
                <h4 style={{ color:"navy" }}>{question}</h4>
            </Link>
            <p className="py-1">{description.substring(0,70)}...</p>
            <div className="w-100 d-flex justify-content-start align-items-center">
                <span className="category px-2 py-1">{category}</span>
                <span className="text-muted mx-3">{new Date(createdAt).toDateString()}</span>
                <span className="align-self-center">
                    <BsFillCaretUpFill className="mb-1 mx-2"/>
                    {likes}
                </span>
                <span className="mx-3">
                    <BsFillChatRightFill style={{ padding:"0.4px"}} className="mx-2"/>
                    {comments.length}
                </span>
            </div>
        <hr/>
        </Container>
    );
};

