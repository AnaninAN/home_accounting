import React from 'react';
import {Table, Button} from 'reactstrap';

export const ViewTable = (props) => {

    const handleDelete = (id) => {
        props.deleteEntity(id);
    };

    return (
        <Table bordered>
            <thead>
            <tr>
                <th>#</th>
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
                props.entities.map((entity => (
                    <tr key={entity.id}>
                        {
                            Object.entries(entity).map(([key, value]) =>
                                <td key={key}>{value}</td>
                            )}
                        <td className='d-flex justify-content-around'>
                            <Button onClick={() => props.editRow(entity)}>Edit</Button>
                            <Button color='danger' onClick={() => handleDelete(entity.id)}>Delete</Button>
                        </td>
                    </tr>
                )))
            ) : (
                <tr>
                    <td>No {props.model.title}</td>
                </tr>
            )}
            </tbody>
        </Table>
    )
};


