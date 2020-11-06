import React from 'react';
import {useState} from "react";
import { Form, Button, InputGroup, FormControl, Container } from "react-bootstrap";
import UserCard from "../UserCard/UserCard";

const User = () => {
    const [newSearch, setNewSearch] = useState('');
    const [users, setUsers]  = useState([]);
    const performUserSearchFetch = (event) => {
        event.preventDefault();
        //! sets the newSearch state to empty AFTER the render is completed
        setNewSearch('');
        fetch(`https://api.github.com/users/${newSearch}`)
            .then(res => {
                if(res.status !== 200){
                    throw Error('can\'t find that one');
                }
                return res;
            })
            .then(res => res.json())
            .then(data => {
                const arrayCopy = [...users]
                arrayCopy.unshift(data)
                setUsers(arrayCopy)
            })
            .catch(e => console.log(e))
    }

    return (
        <Container>
            <Form onSubmit={(event)=>{performUserSearchFetch(event)}}>
                <h3>User Search</h3>
                <Form.Group>
                <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Search"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                type="text"
                                value={newSearch}
                                onChange={(event) => {setNewSearch(event.target.value)}}
                            />
                            <Button variant="primary" type="submit">Search</Button>
                            </InputGroup>
                </Form.Group>
            </Form>
            <h3>Results</h3>
            {users.map((user) => {
            return <UserCard key={user.id} userData={user}></UserCard>})}
        </Container>
    )     
}

export default User;