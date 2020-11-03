import React from 'react';
import './Issue.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";

import 'bootstrap/dist/css/bootstrap.min.css';

const mathFunction = (backgroundColor) => {
    let r = (parseInt(backgroundColor.substring(0, 2), 16)* 0.299)
    let g = (parseInt(backgroundColor.substring(2, 4), 16)* 0.587)
    let b = (parseInt(backgroundColor.substring(4, 6), 16)* 0.114)
    return  (r + g + b > 128)
}

const returnsTime = (timeCreated) => {
    const dateCreated = new Date(timeCreated);
    const currentTime = new Date();
    
    let difference = Math.abs(currentTime - dateCreated)
    const years = difference/ (1000 * 60 * 60 * 24 * 365)
    const months = difference/ (1000 * 60 * 60 * 24 * 30.42)
    const days = difference/ (1000 * 60 * 60 * 24)
    const hours = difference/ (1000 * 60 * 60)
    const min = difference/ (1000 * 60)
    const sec = difference/ (1000 )
    
    if(years >= 1){
        return `${Math.ceil(years)} years ago`
    }else if(months >= 1){
        return `${Math.ceil(months)} months ago`
    }else if(days >= 1){
        return `${Math.ceil(days)} days ago`
    }else if(hours >= 1){
        return `${Math.ceil(hours)} hours ago`
    }else if(min >= 1){
        return `${Math.ceil(min)} min ago`
    }else if(sec >= 1){
        return `${Math.ceil(sec)}`
    }
}

export default function Issue(props) {
        return (
            <div className="Issue">
                <Row>
                    <Badge variant="success" className="badge-pill ml-2" style={{width: '30px'}}>
                        <FontAwesomeIcon icon={faExclamationCircle} size="lg" style={{marginTop: '2px'}}/>
                    </Badge>
                    <a href={`${props.data.html_url}`} className="ml-2" style={{color: "black"}}>
                        <h6 className="font-weight-bold">{props.data.title}</h6>
                    </a>
                    {props.data.labels.map((label, index)=>{
                        return <a className="IssueLabel ml-2" href={`${props.data.html_url}`} key={index} style={{
                            backgroundColor: `#${label.color}`,
                            color: `#${ (mathFunction(label.color) ? '000000' : 'ffffff')}`
                        }}>
                            {label.name}
                        </a>
                    })}
                </Row>
                <Row>
                    <p class="font-weight-light ml-5">{`#${props.data.number} opened ${returnsTime(props.data.created_at)} by ${props.data.user.login}`}</p>
                </Row>
            </div>
        )
}
