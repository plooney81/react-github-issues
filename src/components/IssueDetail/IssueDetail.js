import React from 'react';
import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container} from 'react-bootstrap';
import './IssueDetail.css';

import ReactMarkdown from "react-markdown";

export default function IssueDetail() {
    const {number} = useParams();
    const [detailData, setDetailData] = useState(null);
    const loadIssueDetail = () => {
        fetch(`https://api.github.com/repos/facebook/create-react-app/issues/${number}`)
            .then(res => res.json())
            .then(data => setDetailData(data))
    }
    useEffect(() => {
        loadIssueDetail();
    }, [])

    return (
        <Container>
            {detailData && (
                <>
                    <hr/>
                    <h1 className="title">
                        <span className="justTitle">{detailData.title}</span>
                        <span className="justNumber">#{detailData.number}</span>
                    </h1>
                    <hr/>
                    <div className="detailsBody">
                        <h3 className="detailsBodyTitle">
                            <img className="userPic" src={detailData.user.avatar_url} style={{height: '20px', width: '20px'}}></img>
                            <span className="userLogin">{detailData.user.login}</span>
                        </h3>
                        <ReactMarkdown source={detailData.body} />
                    </div>
                </>
            )}
        </Container>
    )
}
