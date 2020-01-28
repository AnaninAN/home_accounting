import React, { useState } from 'react';

export const CreateForm = (props) => {

    const initialFormState = {};

    const [entity, setEntity] = useState(initialFormState);

    const handleInputChange = (event) => {
        const { name, value } = event.currentTarget;
        setEntity({ ...entity, [name]: value })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!entity.name) return;

        props.addEntity(entity);
        setEntity(initialFormState);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>{props.entity.title}</label>
            {
                props.entity.properties.map(prop => {
                    return <input type='text' name={prop} key={prop} value={entity[prop]} onChange={handleInputChange} />
                })
            }
            <button>Add new {props.entity.title}</button>
        </form>
    )
};