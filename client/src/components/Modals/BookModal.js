import {Button, Modal} from "react-bootstrap";
import ReadingPlan from "../ReadingPlan";
import React, {useState} from 'react';

export default function BookModal(props) {

    const book = props.book;
    let image = '';
    const mode = props.mode;
    const [deleteSure,setDeleteSure] = useState(false);

    if("images" in book) {
        if("thumbnail" in book.images) {
            image = book.images.thumbnail;
        }
    };

    function MainColumn() {
        if(mode === 'search') {
            return <p>{book.description}</p>
        } else {
            return <ReadingPlan plan={book.plan} id={book.id} mode="existing"/>;
        }
    }

    function handleDelete() {
        if(!deleteSure) {
            setDeleteSure(true);
            setTimeout(()=> {setDeleteSure(false)},5000);
        } else {
            props.deleteBook();
        }
    }

    function bodyClass () {
        if(mode === 'search') {
            return null
        } else {
            return "updateModal";
        }
    }

    function BottomButtons() {
        if(mode==="search") {
            return (
                <React.Fragment>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.handleSelectTitle}>
                        Select This Title
                    </Button>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        {deleteSure? "I am sure I want to delete this book":"Delete Book"}
                    </Button>
                </React.Fragment>
            )
        }
    }

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>{book.title} by {book.author} </Modal.Title>
            </Modal.Header>
            <Modal.Body className={bodyClass()}>

                <img src={image} align="left" className="img-thumbnail" style={{height: '200px', width: 'auto', margin: '10px'}}/>
                <MainColumn/>

            </Modal.Body>
            <Modal.Footer>
                <BottomButtons/>
            </Modal.Footer>
        </div>
    )
}