import React from 'react';
import {useParams} from 'react-router-dom';

export default function IssuesByLabel() {
    const {name} = useParams();
    return (
        <div>
            Label: {name}
        </div>
    )

}
