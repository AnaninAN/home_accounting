import React from 'react';

export const Table = (props) => {

    const handleDelete = (id) => {
        props.deleteEntity(id);
    };

    return (
        <table>
            <thead>
            <tr>
                {
                    props.model.properties.map(prop => {
                        return <th key={prop}>{prop}</th>
                    })
                }
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {props.entities.length > 0 ? (
                props.entities.map(entity => (
                    <tr key={entity.id}>
                        <td>{entity.name}</td>
                        <td>
                            <button onClick={() => props.editRow(entity)}>Edit</button>
                            <button onClick={() => handleDelete(entity.id)}>Delete</button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td>No {props.entity}</td>
                </tr>
            )}
            </tbody>
        </table>
    )
};


