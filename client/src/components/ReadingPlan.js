import Table from 'react-bootstrap/Table'
import moment from 'moment';
import {useEffect, useState} from "react";
import {Button,Toast} from "react-bootstrap";
import {useSelector} from "react-redux";
import {createReadingPlan, saveReadingPlan, savePlanProgress} from "../functions/bookFunctions";
import SimpleToast from "./SimpleToast";


export default function ReadingPlan(props) {

    const [plan,setPlan] = useState(Object.values(props.plan));
    const [msgDisplayed, setMgsDisplayed] = useState(false);
    const [msgHeader,setMsgHeader] = useState('');
    const [msgBody,setMsgBody] = useState('');
    const mode = props.mode;
    const token = useSelector(state => state.loginReducer.token);

    useEffect(()=> {
        setPlan(Object.values(props.plan));
    },[props])

    function getDate(dt) {
        return moment(dt).format("yyyy-MM-DD");
    }

    async function changeInput(newValue,i,item,checkDate=false) {
        const newState = [...plan];
        newState[i][item] = newValue;
        setPlan(newState);
        if(item==='date' && checkDate) checkDates();
        if(mode==='existing') {
            const update = savePlanProgress(props.id,plan,token);
        }
    }

    function checkDates() {
        for(let i = 1; i < plan.length; i++) {
            if(!moment(plan[i].date).startOf('day').isAfter(moment(plan[i-1].date).startOf('day'))) {
                changeInput(moment(plan[i-1].date).add(1,'days'),i,"date",false)
            }
        }
    }

    async function savePlan() {
        const response = await saveReadingPlan(props.book,plan,token);
        if(response.success) {
            setMsgBody('Your plan has been saved!');
            setMsgHeader('Success!');
            setMgsDisplayed(true);
        } else {
            setMsgBody('Your plan was not saved!  Something went wrong!');
            setMsgHeader('Oh no!');
            setMgsDisplayed(true);
        }
        setTimeout(()=> {setMgsDisplayed(false)},7500)
    }

    function Buttons () {
        if(mode === 'existing') {
            return null;
        } else {
            return <Button variant="success" size='sm' className='' onClick={savePlan}>Save This Plan</Button>
        }
    }

    return(
        <div>
            <Buttons/>
            <Table hover size='sm' id='planTable'>
                <thead>
                <tr>
                    <th>Day</th>
                    <th>Date</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Done</th>
                </tr>
                </thead>
                <tbody>
                {plan.map((item,i) => {
                    return(<tr key={'rp-input-' + i}>
                            <th>{item.day}</th>
                            <th><input type="date" value={getDate(item.date)} onChange={e=>changeInput(e.target.value,i,'date',true)}/></th>
                            <th><input type='number' className="numberInput" value={item.from} onChange={e=>changeInput(e.target.value,i,'from')}></input></th>
                            <th><input type='number' className="numberInput" value={item.to} onChange={e=>changeInput(e.target.value,i,'to')}></input></th>
                            <th><input type='checkbox' className='checkbox' checked={item.completed} onChange={e=>changeInput(e.target.checked,i,'completed')}></input></th>
                        </tr>)

                })}
                </tbody>
            </Table>
            {msgDisplayed?
                <SimpleToast  header="Success!" message="Your reading plan was saved!" />
            : null
            }
        </div>
    )
}