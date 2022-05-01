import {Container, Row, Col, Accordion } from "react-bootstrap";
import BookSearchComponent from "../components/BookSearch/BookSearchComponent";
import MyBooksComponent from "../components/MyBooksComponent"
import { useDispatch, useSelector } from "react-redux";
import booksSearchReducer from "../store/booksSearchReducer";
import {Modal,Button} from "react-bootstrap";
import {useState,useEffect} from "react";
import {
    addMyBooksFromServer,
    addSelectedBookForReadingPlan,
    addSelectedMyBook,
    clearSelectedBookFromSearch, clearSelectedMyBook
} from "../store/actions";
import {useNavigate} from "react-router-dom";
import {deleteBookFromServer, getMyBooks} from "../functions/bookFunctions";
import BookModal from "../components/Modals/BookModal";
import AddBook from "./AddBook";

export default function MyBooks() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedSearchBook = useSelector(state => state.booksSearchReducer.selectedBookFromSearch);
    const selectedMyBook = useSelector(state => state.myBooksReducer.selectedMyBook);
    const isSelectedSearchBookObjectEmpty = selectedSearchBook.title === null;
    const isSelectedMyBookObjectEmpty = selectedMyBook.title === null;
    const token = useSelector(state => state.loginReducer.token);

    const [showModal, setShowModal] = useState(!isSelectedSearchBookObjectEmpty);
    const [book,setBook] = useState({});
    const [image,setImage] = useState('');
    const [mode,setMode] = useState('');

    const handleCloseModal = () => {
        dispatch(clearSelectedBookFromSearch());
        dispatch(clearSelectedMyBook());
        setShowModal(false);
    };

    const handleSelectedTitle = () => {
        dispatch(addSelectedBookForReadingPlan(selectedSearchBook))
        dispatch(clearSelectedBookFromSearch())
        navigate('/add-book');
    }

    async function getBooks() {
        if(!token) return;
        const response = await getMyBooks(token);
        if(response.books) {
            dispatch(addMyBooksFromServer(response.books))
        }
    }

    useEffect(async () => {
        await getBooks();
    });

    function updateImage() {
        if("images" in selectedSearchBook && mode === 'search') {
            if("thumbnail" in selectedSearchBook.images) {
                setImage(selectedSearchBook.images.thumbnail);
            }
        };
        if("images" in selectedMyBook && mode === 'myBook') {
            if("thumbnail" in selectedMyBook.images) {
                setImage(selectedMyBook.images.thumbnail);
            }
        };
    }

    async function deleteBook() {
        const req = await deleteBookFromServer(token,book.id);
        if(req.success) {
            handleCloseModal();
            clearSelectedMyBook();
            await getBooks()
        };
    }

    useEffect(async ()=> {
        if(!isSelectedSearchBookObjectEmpty) {
            setMode('search');
            setBook(selectedSearchBook);
            updateImage();
            setShowModal(true);
        }
        if(!isSelectedMyBookObjectEmpty) {
            setMode('myBook');
            setBook(selectedMyBook);
            updateImage();
            setShowModal(true);
        }
    },[selectedSearchBook,selectedMyBook]);

    return(
        <div>
            <Container>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <BookModal
                        mode={mode} book={book}
                        handleClose={handleCloseModal}
                        handleSelectTitle={handleSelectedTitle}
                        deleteBook={deleteBook}
                    />
                </Modal>
                <Row>
                    <h2 className="text-center py-4">My Books</h2>
                </Row>
                <Row>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>My Books</Accordion.Header>
                            <Accordion.Body>
                                <MyBooksComponent/>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Search Google Books</Accordion.Header>
                            <Accordion.Body>
                                <BookSearchComponent/>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Accordion Item #2</Accordion.Header>
                            <Accordion.Body>

                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row>
            </Container>
        </div>
    )
}