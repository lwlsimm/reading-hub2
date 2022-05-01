import {Toast} from "react-bootstrap";
import {useEffect, useState} from "react";

export default function SimpleToast(props) {

    const visible = useState(true);

    useEffect(()=> {

    },[])

    return(
        <Toast className="simpleToast fade-in-image">
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">{props.header}</strong>
            </Toast.Header>
            <Toast.Body>{props.message}</Toast.Body>
        </Toast>
    )

}