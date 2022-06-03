import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import moment from "moment";
import Table from "react-bootstrap/Table";
import {savePlanProgress} from "../functions/bookFunctions";

export default function TodayReadingComponent(props) {

    const myBooks = useSelector(state => state.myBooksReducer.myBooks);
    const [nextReading,setNextReading] = useState([]);
    const [redDate,setRedDate] = useState('');
    const token = useSelector(state => state.loginReducer.token);

    useEffect(async ()=> {
        await getData();
    },[myBooks]);

    async function getData() {
        const readingArray = [];
        myBooks.forEach(book => {
            let skip = false;
            book.plan.forEach(day => {
                if(skip) return
                if(!day.completed) {
                    readingArray.push({
                        title: book.title,
                        id: book.id,
                        day: day
                    })
                    skip = true;
                }
            })
        })
        readingArray.sort(function compare(a, b) {
            const dateA = new Date(a.day.date);
            const dateB = new Date(b.day.date);
            return dateA - dateB;
        });
        setNextReading(readingArray);
    }

    function getDate(dt) {
        return moment(dt).format(" ddd, DD MMM 'YY");
    }

    async function changeInput(newValue,i,item) {
        const newState = [...nextReading];
        newState[i]['day'][item] = newValue;
        setNextReading(newState);
    }

    async function markAsComplete(i,id,date,from,to) {
        const book = myBooks.filter(item => item.id === id)[0];
        const revisedPlan = book.plan.map(item => {
            if(item.date === date) {
                return {
                    date: item.date,
                    day: item.day,
                    from: parseInt(from),
                    to: parseInt(to),
                    total_to_read: parseInt(to) - parseInt(from),
                    completed: true,
                }
            } else {
                return item;
            }
        });
        const res = await savePlanProgress(id,revisedPlan,token);
        if (res.success) {
            await props.getBooks();
            setRedDate(id);
            setTimeout(()=>{setRedDate('')},2000);
        };

    }

    return(
        <div>
            <Table hover size='sm' id='planTable'>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Done</th>
                </tr>
                </thead>
                <tbody>
                {nextReading.map((item,i) => {
                    return(<tr key={'rp-input-' + i}>
                        <td>{item.title}</td>
                        <td
                            className={redDate===item.id?'text-danger':'text-black'}
                        >{getDate(item.day.date)}</td>
                        <td><input type='number' className="numberInput" value={item.day.from} onChange={e=>changeInput(e.target.value,i,'from')}></input></td>
                        <td><input type='number' className="numberInput" value={item.day.to} onChange={e=>changeInput(e.target.value,i,'to')}></input></td>
                        <td><button type="button" className="btn btn-success doneBtn" onClick={()=>markAsComplete(i,item.id,item.day.date,item.day.from,item.day.to)}>Done</button></td>
                    </tr>)

                })}
                </tbody>
            </Table>
        </div>
    )
}