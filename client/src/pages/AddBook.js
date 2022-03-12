import booksReducer from "../store/booksReducer";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function AddBook() {

    const book = useSelector(state => state.booksReducer.selectedBookForReadingPlan);
    const navigate = useNavigate();

    let image = './'

    if("images" in book) {
        if("thumbnail" in book.images) {
            image = book.images.thumbnail
        }
    }

    useEffect(()=> {
        if(Object.keys(book).length === 0) {
            navigate('/account');
        }
    },[])

    return (
        <Container >
            <div id='addBook'>
                <Row id='addBookTopRow' className='p-3'>
                    <Col sm={12} md={4} className='d-flex justify-content-center align-items-center'>
                        <div>
                            <img src={image}/>
                        </div>
                    </Col>
                    <Col sm={12} md={8}>
                        <h4 className='mb-3 text-center'>{book.title} by {book.author}</h4>
                        <div className="overflow-auto text-justify descriptionBox">{book.description}</div>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}