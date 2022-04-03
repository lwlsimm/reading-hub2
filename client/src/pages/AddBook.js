import booksReducer from "../store/booksReducer";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {createReadingPlan} from "../functions/bookFunctions";
import ReadingPlan from "../components/ReadingPlan";

export default function AddBook() {

    const [start,setStart] = useState(1);
    const [end,setEnd] = useState(2);
    const [measure,setMeasure] = useState('Pages');
    const [mode,setMode] = useState('endDate');
    const [startDate,setStartDate] = useState('');
    const [endDate,setEndDate] = useState('');
    const [measurePerDay,setMeasurePerDay] = useState('');
    const [formValid,setFormValid] = useState(false);
    const [image,setImage] = useState('./');
    const [plan,setPlan] = useState({});
    const [bookFromServer,setBookFromServer] = useState({});

    const book = useSelector(state => state.booksReducer.selectedBookForReadingPlan);
    const token = useSelector(state => state.loginReducer.token);
    const navigate = useNavigate();

    useEffect(()=> {
        if(!book.hasOwnProperty('title')) {
            navigate('/account');
        }
        if(mode === "endDate") {
            if(startDate !== "" && endDate !== "" && endDate >= startDate && measure && start && end && end >= start) {
                setFormValid(true);
            } else {
                setFormValid(false);
            }
        } else {
            if(startDate !== "" && measurePerDay && measure && start && end && end >= start) {
                setFormValid(true);
            } else {
                setFormValid(false);
            }
        }
        if("images" in book) {
            if("thumbnail" in book.images) {
                setImage(book.images.thumbnail);
            }
        }
    },[startDate,endDate,start,end,measure,measurePerDay,mode,plan]);

    async function createPlan() {
        const responseData = await createReadingPlan({
            start: start,
            end: end,
            measure: measure,
            mode: mode,
            startDate: startDate,
            endDate: endDate,
            measurePerDay: measurePerDay,
            book: book,
        },token);
        if(responseData.success) {
            setPlan(responseData.plan);
            setBookFromServer(responseData.book);
        }
    }

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

                <Row className='p-2 createPlanRow align-items-start'>
                    <Col sm={12}>
                        <h5 className='mb-3 text-center bookHeader'>Create a Reading Plan</h5>
                    </Col>
                    <Col sm={12} md={6}
                         className='p-3 d-flex flex-column align-items-center justify-content-center'>
                        <small className='text-center'>I will measure progress by</small>
                        <select className='w-75 p-1' onChange={e => setMeasure(e.target.value)}>
                            <option>Pages</option>
                            <option>Percentage</option>
                            <option>Locations</option>
                        </select>
                        <small className='text-center'>Yoo are starting at {measure.toLowerCase()} no. :</small>
                        <input type='number' className='w-75 p-1'
                               onChange={e => setStart(parseInt(e.target.value))}/>
                        <small className='text-center'>You are ending at {measure.toLowerCase()} no. :</small>
                        <input type='number' className='w-75 p-1'
                               onChange={e => setEnd(parseInt(e.target.value))}/>

                        <small className='text-center'>I want to...</small>
                        <select className='w-75 p-1' onChange={e => setMode(e.target.value)}>
                            <option value="endDate">Start and end on specific dates</option>
                            <option value='perDay'>Read a set number of {measure.toLowerCase()} per day</option>
                        </select>
                        <small className='text-center mt-2'>Start Date</small>
                        <input type='date' className='w-75 p-1' onChange={e => setStartDate(e.target.value)}/>
                        {mode === 'endDate' ?
                            <>
                                <small className='text-center mt-2'>End Date</small>
                                <input type='date' className='w-75 p-1'
                                       onChange={e => setEndDate(e.target.value)}/>
                            </> :
                            <>
                                <small className='text-center mt-2'>How may {measure.toLowerCase()} per
                                    day</small>
                                <input type='number' className='w-75 p-1'
                                       onChange={e => setMeasurePerDay(e.target.value)}/>
                            </>
                        }


                        <Button variant="success" size='sm' className='mt-3' disabled={!formValid}
                        onClick={createPlan}
                        >
                            Create My Reading Plan
                        </Button>
                    </Col>
                    <Col sm={12} md={6}>
                        {Object.keys(plan).length > 0 ?
                        <ReadingPlan plan={plan} book={bookFromServer}/>
                        : null
                        }
                    </Col>
                </Row>
            </div>
        </Container>
    )
}