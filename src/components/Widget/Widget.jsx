import React from 'react';
import { DragSource } from 'react-dnd';
import { Container, Row, Button } from 'reactstrap';

import { WidgetContent } from '../WidgetContent';

const subjectSource = {
    beginDrag(props) {
        const { id, left, top } = props;
        return { id, left, top };
    },
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
}

class Widget extends React.Component {
    state = {
            visible: true,
        };

    toggleVisibility = () => {
        this.setState(() => ({
                visible: !this.state.visible,
            }));
    };

    render() {
        const { connectDragSource } = this.props;
        return connectDragSource(
            <div className='position-absolute bg-white border' style={{ left: this.props.left, top: this.props.top }} id={this.props.entity.id}>
                <Container>
                <Row className='d-flex justify-content-between mb-1 p-1'>
                    <h4 className='text-capitalize'>{this.props.entity.name}</h4>
                    <Button onClick={this.toggleVisibility}>
                        {this.state.visible ? 'hide' : 'show'}
                    </Button>
                </Row>
                {this.state.visible === true &&
                    <WidgetContent entity={this.props.entity}/>
                }
                </Container>
            </div>,
        );
    }
}

export default DragSource('widget', subjectSource, collect)(Widget);


