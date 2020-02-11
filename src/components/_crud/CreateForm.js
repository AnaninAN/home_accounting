import React, {useState, Fragment} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

export const CreateForm = props => {

    const [entity, setEntity] = useState({});

    const handleInputChange = event => {
        const {name, value} = event.currentTarget;

        setEntity({...entity, [name]: value});
    };

    const handleSubmit = event => {
        event.preventDefault();
        props.addEntity(entity);
        setEntity({});
    };

    const renderInput = prop => {
        if (prop.includes('_id')) {
            return (
                <Fragment>
                    <Label for={prop}>{prop.replace('_id', '')}</Label>
                    <Input type="select" name={prop} id={prop} onChange={handleInputChange}>
                    <option value=''>Select .....</option>
                        {
                            Array.from(props.entities.get(prop.replace('_', ' ').slice(0, -3)).values()).map(entity => {
                                return <option key={entity.id} value={entity.id}>{entity.name}</option>
                            })
                        }
                    </Input>
                </Fragment>
            )
        } else if (prop.includes('date')) {
            return (
                <Fragment>
                    <Label for={prop}>{prop}</Label>
                    <Input type='date' name={prop} value={!entity[prop] ? '' : entity[prop]}
                        onChange={handleInputChange}/>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <Label for={prop}>{prop}</Label>
                    <Input type='text' name={prop} value={!entity[prop] ? '' : entity[prop]}
                           onChange={handleInputChange}/>
                </Fragment>
            )
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {
                props.model.properties.map(prop => {
                    return (
                        <FormGroup className='text-left' key={prop}>
                            {renderInput(prop)}
                        </FormGroup>
                    )
                })
            }
            <Button>Add new {props.model.title}</Button>
        </Form>
    )
};