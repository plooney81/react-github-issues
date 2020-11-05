import React from 'react';
import {useState, useEffect} from "react";
import { Badge, Form, Button, InputGroup, FormControl } from "react-bootstrap";

export default function User() {
    const [newSearch, setNewSearch] = useState('');
    const [users, setUsers]  = useState([]);
    const performUserSearchFetch = () => {
        //! sets the newSearch state to empty AFTER the render is completed
        setNewSearch('');
        fetch(`https://api.github.com/users/${newSearch}`)
            .then(res => res.json())
            .then(data => setUsers([...users].concat(data)))
            .catch(e => console.log(e))
    }
    const someSubmitFunction = (event) => {
        event.preventDefault();
        performUserSearchFetch();
        console.log()
        
    }

    //Alternatively using the useEffect method
    useEffect(() => {
        
    }, [])

    return (
        // TODO Change name of function below
        <Form onSubmit={someSubmitFunction}>
            <Form.Group>
            <InputGroup className="mb-3">
                        {/* <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1" onChange={handleChange} value={newSearch}>New Task</InputGroup.Text>
                        </InputGroup.Prepend> */}
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
    )     
}
