import './Widget.scss';

import React, { PureComponent } from 'react';
import { DragSource } from 'react-dnd';
import { Container, Row, Button } from 'reactstrap';

import { WidgetAccountContent } from 'components/WidgetAccountContent';

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

class Widget extends PureComponent {
  state = {
    visible: true,
  };

  toggleVisibility = () => {
    this.setState(() => ({
      visible: !this.state.visible,
    }));
  };

  render() {
    const { connectDragSource, entity, dependencies, left, top } = this.props;
    const convertedEntity = [];
    for (let [key, value] of Object.entries(entity)) {
      if (key.includes('_id')) {
        convertedEntity[key] = dependencies.getIn([key.replace('_', ' ').slice(0, -3), value.toString(), 'name']);
      } else {
        convertedEntity[key] = value;
      }
    }

    return connectDragSource(
      <div className='position-absolute bg-white border' style={{left, top}} id={entity.id}>
        <Container className='widget'>
          <Row className='d-flex justify-content-between p-1'>
            <h4 className='text-capitalize'>{entity.name}</h4>
            <Button onClick={this.toggleVisibility} color='info'>
              {this.state.visible ? 'hide' : 'show'}
            </Button>
          </Row>
          {this.state.visible === true && <WidgetAccountContent entity={convertedEntity}/>}
        </Container>
      </div>
    );
  }
}

export default DragSource('widget', subjectSource, collect)(Widget);