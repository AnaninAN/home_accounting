import React, { useState, useEffect } from 'react';

export const UpdateForm = (props) => {

    const [entity, setEntity] = useState(props.currentEntity);

    useEffect(
        () => {
            setEntity(props.currentEntity);
        },
        [props]
    );

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setEntity({ ...entity, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!entity.name) return;

        props.updateEntity(entity);
    };

    return (
        <form onSubmit={handleSubmit}>
            {
                props.entity.properties.map(prop => {
                    return (
                        <div key={prop}>
                            <label>{prop}</label>
                            <input type='text' name={prop} value={entity[prop]} onChange={handleInputChange} />
                        </div>
                    )
                })
            }
            <button>Update category</button>
            <button onClick={() => props.setEditing(false)}>Cancel</button>
        </form>
    )
};