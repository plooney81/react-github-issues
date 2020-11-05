import React from 'react';
import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container} from 'react-bootstrap';
import './IssueDetail.css';

import TimeSince from '../../lib/TimeSince';

import ReactMarkdown from "react-markdown/with-html";

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
                <div>
                    <h1 className="title ml-3">
                        <span className="justTitle">{detailData.title}</span>
                        <span className="justNumber">#{detailData.number}</span>
                    </h1>
                    <div className="d-flex ml-3">
                        <span className="openTag mb-3">
                            <svg height="16" className="octicon octicon-issue-opened" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true">
                                <path fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"></path>
                            </svg>
                            <span className="ml-1">Open</span>
                        </span>
            <p style={{paddingTop: "4px"}}>{detailData.user.login} <span style={{color: "#586069"}}>opened this issue {TimeSince(detailData.created_at)}</span></p>
                    </div>
                    <hr/>
                    <div className="detailsBody border rounded mt-3">
                        <h3 className="detailsBodyTitle">
                            <img className="userPic ml-3" src={detailData.user.avatar_url} alt={`${detailData.user.login}'s profile`} style={{height: '20px', width: '20px'}}></img>
                            <span className="userLogin ml-3">{detailData.user.login}</span>
                        </h3>
                        <ReactMarkdown className="border-top p-3 markdown" source={detailData.body} allowDangerousHtml={true}/>
                    </div>
                </div>
            )}
        </Container>
    )
}
