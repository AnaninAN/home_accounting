import React, {useEffect, useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

export const CreateForm = props => {

    const [entity, setEntity] = useState({});

    const handleInputChange = event => {
        const {name, value} = event.currentTarget;

        setEntity({...entity, [name]: value});
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (!entity.name) return;

        props.addEntity(entity);
        setEntity({});
    };

    return (
        <Form onSubmit={handleSubmit}>
            {
                props.model.properties.map(prop => {
                    return (
                        <FormGroup className='text-left' key={prop}>
                            <Label for={prop}>{prop}</Label>
                            <Input type='text' name={prop} value={!entity[prop] ? '' : entity[prop]}
                                   onChange={handleInputChange}/>
                        </FormGroup>
                    )
                })
            }
            <Button>Add new {props.model.title}</Button>
        </Form>
    )
};