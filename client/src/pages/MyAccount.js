import {Container, Row, Col, Accordion } from "react-bootstrap";
import BookSearchComponent from "../components/BookSearch/BookSearchComponent";
import { useDispatch, useSelector } from "react-redux";
import booksReducer from "../store/booksReducer";
import {Modal,Button} from "react-bootstrap";
import {useState,useEffect} from "react";
import {addSelectedBookForReadingPlan, clearSelectedBookFromSearch} from "../store/actions";
import {useNavigate} from "react-router-dom";

export default function MyAccount() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedBook = useSelector(state => state.booksReducer.selectedBookFromSearch);
    const isBookObjectEmpty = selectedBook.title === '!Empty-Selected-Book!';

    const [showModal, setShowModal] = useState(!isBookObjectEmpty);

    const handleCloseModal = () => {
        dispatch(clearSelectedBookFromSearch())
        setShowModal(false);
    };

    const handleSelectedTitle = () => {
        dispatch(addSelectedBookForReadingPlan(selectedBook))
        dispatch(clearSelectedBookFromSearch())
        navigate('/add-book');
    }

    let image = './'
    if("images" in selectedBook) {
        if("thumbnail" in selectedBook.images) {
            image = selectedBook.images.thumbnail
        }
    }

    useEffect(()=> {
        if(!isBookObjectEmpty) setShowModal(true);
    })

    return(
        <div>
            <Container>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedBook.title} by {selectedBook.author} </Modal.Title>

                    </Modal.Header>
                    <Modal.Body>

                            <img src={image} align="left" className="img-thumbnail" style={{height: '200px', width: 'auto', margin: '10px'}}/>
                            <p >{selectedBook.description}</p>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSelectedTitle}>
                            Select This Title
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Row>
                    <h2 className="text-center py-4">Add Books</h2>
                </Row>
                <Row>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Search Google Books</Accordion.Header>
                            <Accordion.Body>
                                <BookSearchComponent/>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Accordion Item #2</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row>
            </Container>
        </div>
    )
}