import React, {useState, useEffect} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

export const UpdateForm = props => {

    const [entity, setEntity] = useState(props.currentEntity);

    useEffect(
        () => {
            setEntity(props.currentEntity);
        },
        [props]
    );

    const handleInputChange = event => {
        const {name, value} = event.target;

        setEntity({...entity, [name]: value});
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (!entity.name) return;

        props.updateEntity(entity);
    };

    return (
        <Form onSubmit={handleSubmit}>
            {
                props.model.properties.map(prop => {
                    return (
                        <FormGroup className='text-left' key={prop}>
                            <Label for={prop}>{prop}</Label>
                            <Input
                                type='text'
                                name={prop}
                                value={!entity[prop] ? '' : entity[prop]}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                    )
                })
            }
            <FormGroup className='d-flex justify-content-around'>
                <Button>Update {props.model.title}</Button>
                <Button color='danger' onClick={() => props.setEditing(false)}>Cancel</Button>
            </FormGroup>
        </Form>
    )
};