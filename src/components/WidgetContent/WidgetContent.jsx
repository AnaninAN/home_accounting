import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export class WidgetContent extends React.Component {
    render() {
        return (
            <ListGroup className='w-100'>
                {Object.entries(this.props.entity).map(([key, value]) =>
                    <ListGroupItem key={key}>{key} : {value}</ListGroupItem>
                )}
            </ListGroup>
        )
    }
}