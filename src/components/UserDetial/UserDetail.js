import React from 'react';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {Nav, Card} from 'react-bootstrap';

import Repos from '../Repos/Repos';

import ReactMarkdown from "react-markdown/with-html";
import './UserDetail.css';

export default function UserDetail() {
    let {login} = useParams()
    const [users, setUsers]  = useState(null);
    const [repos, setRepos] = useState([]);
    const [link, setLink]  = useState('overview');
    const [readMe, setReadMe] = useState('');
    // const { avatar_url, repos_url, html_url, name, bio, public_repos } = users

    useEffect(() => {
        fetch(`https://api.github.com/users/${login}`)
            .then(res => {
                if(res.status !== 200){
                    throw Error('can\'t find that one');
                }
                return res;
            })
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(e => console.log(e))

        fetch(`https://api.github.com/users/${login}/repos`)
            .then(res => {
                if(res.status !== 200){
                    throw Error('can\'t find that one');
                }
                return res;
            })
            .then(res => res.json())
            .then(data => setRepos(data))
            .catch(e => console.log(e))
        
        fetch(`https://api.github.com/repos/${login}/${login}/readme`)
            .then(res => {
                if(res.status !== 200){
                    throw Error('can\'t find that one');
                }
                return res;
            })
            .then(res => res.json())
            .then(data => setReadMe(atob(data.content)))
            .catch(e => console.log(e))
    }, [])
    return (
        <>
        {users && (
            <Card>
            <Card.Header>
            <Nav variant="tabs" defaultActiveKey="#first" className="navTabs">
                <Nav.Item>
                    <Nav.Link className="navlink" href="#first" onClick={() => {setLink('overview')}}>Overview</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="navlink" href="#second" onClick={() => {setLink('repos')}}>
                        Repositories<span className="counter">{users.public_repos}</span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="navlink" href="#third" onClick={() => {setLink('projects')}}>Projects</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="navlink" href="#fourth" onClick={() => {setLink('packages')}}>Packages</Nav.Link>
                </Nav.Item>
            </Nav>
            </Card.Header>
            <Card.Body className="d-flex">
                <Card.Title className="d-flex flex-column profileDescription">
                    <img className="userPic mr-3" src={users.avatar_url} alt={`${login}'s profile`} style={{height: 'auto', width: '100%'}}></img>
                    <h1>{users.name}</h1>
                    <h2>{login}</h2>
                    <h3>{users.bio}</h3>
                </Card.Title>
                <Card.Text>
                {/* //! Conditional */}
                {(link === 'overview') &&
                (
                    // <div>{users.bio}</div>
                    <ReactMarkdown className="border-top p-3 markdown" source={readMe} allowDangerousHtml={true}/>
                )}
                {(link === 'repos') && (
                    repos.map((repo) => {
                        return <Repos key={repo.id} repoData={repo}></Repos>
                    })
                )} 
                </Card.Text>
                {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
        </Card>
        )}
        </>
    )
}
