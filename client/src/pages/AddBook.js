import booksSearchReducer from "../store/booksSearchReducer";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {createReadingPlan} from "../functions/bookFunctions";
import ReadingPlan from "../components/ReadingPlan";
import CreateRedaingPlan from "../components/CreateReadingPlan";

export default function AddBook() {

    const [image,setImage] = useState('./defaultSmallBook.png');

    useEffect(()=> {
        if("images" in book) {
            if("thumbnail" in book.images) {
                setImage(book.images.thumbnail);
            }
        }
    })

    const book = useSelector(state => state.booksSearchReducer.selectedBookForReadingPlan);

    return (
        <Container>
            <div id='addBook'>
                <Row className='p-3'>
                    <h4 className='mb-3 text-center bookHeader'>{book.title} by {book.author}</h4>

                    <Col sm={12} md={4} className='d-flex justify-content-center align-items-center'>
                        <Row>
                            <Col sm={12}>
                                <div className='bookImageHolder'>
                                    <img src={image}/>
                                </div>
                            </Col>
                            <Col sm={12} className='d-flex justify-content-center align-items-center mb-2'>
                                <a href={book.additionalDetails.volumeInfo.canonicalVolumeLink} target='_blank'><Button
                                    variant="success" size='sm' className=''>View in Google Books</Button></a>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={12} md={8}>
                        <Row>
                            <Col sm={12} md={6}>
                                <h6 className='text-center'>Details</h6>
                                {
                                    book.additionalDetails.volumeInfo.subtitle?
                                    <p className="detailParagraph"><span
                                        className="detailsHeader">Subtitle: </span>{book.additionalDetails.volumeInfo.subtitle}
                                    </p> :
                                    null
                                }
                                <p className="detailParagraph"><span
                                    className="detailsHeader">Publisher: </span>{book.additionalDetails.volumeInfo.publisher}
                                </p>
                                <p className="detailParagraph"><span
                                    className="detailsHeader">Publication Date: </span>{book.additionalDetails.volumeInfo.publishedDate}
                                </p>
                                <p className="detailParagraph"><span
                                    className="detailsHeader">Page Count: </span>{book.additionalDetails.volumeInfo.pageCount}
                                </p>
                                {book.additionalDetails.volumeInfo.categories?
                                    <p className="detailParagraph"><span
                                        className="detailsHeader">Categories: </span>{book.additionalDetails.volumeInfo.categories.toString()}
                                    </p>: null
                                }
                                <p className="detailParagraph"><span
                                    className="detailsHeader">ISBN 13: </span>{book.additionalDetails.volumeInfo.industryIdentifiers[0].identifier}
                                </p>
                                {book.additionalDetails.volumeInfo.industryIdentifiers.length > 1 ?
                                    <p className="detailParagraph"><span
                                        className="detailsHeader">ISBN 10: </span>{book.additionalDetails.volumeInfo.industryIdentifiers[1].identifier}
                                    </p> :
                                    null
                                }
                            </Col>
                            <Col sm={12} md={6}>
                                <h6 className='text-center'>Description</h6>
                                <div
                                    className="overflow-auto text-justify descriptionBox">{book.description}</div>
                            </Col>
                        </Row>

                    </Col>
                </Row>
                <div className="addBookDivider">
                    <hr/>
                </div>
                    <CreateRedaingPlan
                        getBooks={()=>{return null}}
                        book={book}
                    />

            </div>
        </Container>
    )
}