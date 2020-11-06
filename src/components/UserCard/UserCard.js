import React from 'react';
import { Nav, Card } from "react-bootstrap";
import { useState, useEffect } from 'react';
import './UserCard.css';
import { Link } from 'react-router-dom';


export default function UserCard(props) {
    const { login, avatar_url, repos_url, html_url, name, bio, public_repos } = props.userData;
    const [link, setLink]  = useState('profile');
    const [repos, setRepos] = useState([]);
    useEffect(() => {
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

    }, [])
    return (
        // <div>
        //     {props.userData.login}
        // </div>
        <Card>
            <Card.Header>
            <Nav variant="tabs" defaultActiveKey="#first">
                <Nav.Item>
                    <Nav.Link className="navlink" href="#first" onClick={() => {setLink('profile')}}>Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="navlink" href="#second" onClick={() => {setLink('repos')}}>
                        Repos <span className="counter">{public_repos}</span>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            </Card.Header>
            <Card.Body>
                <Card.Title className="d-flex">
                    <img className="userPic mr-3" src={avatar_url} alt={`${login}'s profile`} style={{height: '20px', width: '20px'}}></img>
                    <Link to={`user/detail/${login}`}>{name}</Link><span className="ml-2">{login}</span>
                </Card.Title>
                <Card.Text>
                {/* //! Conditional */}
                {(link === 'profile') &&
                (
                    bio
                )}
                {(link === 'repos') && (
                    repos.map((repo, index) => {
                        return (index < 10) ? <li key={repo.id}>{repo.name}</li> : ''
                    })
                )} 
                </Card.Text>
                {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
        </Card>
    )
}


