import {Button, Col, Row} from "react-bootstrap";
import ReadingPlan from "./ReadingPlan";
import {useState, useEffect} from "react";
import {createReadingPlan} from "../functions/bookFunctions";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function CreateReadingPlan(props) {

    const {book} = props;
    const [bookFromServer,setBookFromServer] = useState({});

    const token = useSelector(state => state.loginReducer.token);
    const navigate = useNavigate();

    const [start,setStart] = useState(1);
    const [end,setEnd] = useState(2);
    const [measure,setMeasure] = useState('Pages');
    const [mode,setMode] = useState('endDate');
    const [startDate,setStartDate] = useState('');
    const [endDate,setEndDate] = useState('');
    const [measurePerDay,setMeasurePerDay] = useState('');
    const [formValid,setFormValid] = useState(false);
    const [plan,setPlan] = useState({});

    useEffect(()=> {
        if(!book.hasOwnProperty('title')) {
            navigate('/my-books');
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
        props.getBooks();
    }

    return(
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
            <small className='text-center'>You are starting at {measure.toLowerCase()} no. :</small>
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
                <ReadingPlan plan={plan} book={bookFromServer} mode="new"/>
                : null
            }
        </Col>
    </Row>
    )
}