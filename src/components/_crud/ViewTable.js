import React from 'react';
import {Table, Button} from 'reactstrap';

export const ViewTable = props => {

    const handleDelete = id => {
        props.deleteEntity(id);
    };

    const renderGrid = model => {
        if (typeof(model['dependencies']) !== 'undefined') {
            return (
                Array.from(props.entities.get(props.model.title).values()).map((entity => (
                    <tr key={entity.id}>
                        {
                            Object.entries(entity).map(([key, value]) => {
                                    if (key.includes('_id')) {
                                        return <td key={key}>
                                            {props.entities.getIn([key.replace('_', ' ').slice(0, -3), value.toString(), 'name'])}
                                        </td>
                                    } else {
                                        return <td key={key}>{value}</td>
                                    }
                                }
                            )
                        }
                        <td className='d-flex justify-content-around'>
                            <Button onClick={() => props.editRow(entity)}>Edit</Button>
                            <Button color='danger' onClick={() => handleDelete(entity.id)}>Delete</Button>
                        </td>
                    </tr>
                )))
            )
        } else {
            return (
                Array.from(props.entities.values()).map((entity => (
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
            )
        }
    };

    return (
        <Table bordered>
            <thead>
            <tr>
                <th>#</th>
                {
                    props.model.properties.map(prop => {
                        return <th key={prop}>{prop.replace('_id', '')}</th>
                    })
                }
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {props.entities.size > 0 ?
                (
                    renderGrid(props.model)
                ) : (
                    <tr>
                        <td>No {props.model.title}</td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
};


