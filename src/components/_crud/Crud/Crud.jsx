import './Crud.scss';

import React, { PureComponent, Fragment } from 'react';
import { Row, Col } from 'reactstrap';

import { CreateForm } from 'crud/CreateForm';
import { ViewTable } from 'crud/ViewTable';
import { UpdateForm } from '../UpdateForm';

export class Crud extends PureComponent {
  state = {
    editing: false,
    currentEntity: '',
  };

  setEditing = value => {
    this.setState({
      editing: value,
    })
  };

  editRow = entity => () => {
    this.setState({
      editing: true,
      currentEntity: {...entity},
    });
  };

  handleCreateEntity = event => {
    return this.props.createEntity(event, this.props.model);
  };

  handleRemoveEntity = event => {
    this.setState({
      editing: false,
    });

    return this.props.removeEntity(event, this.props.model);
  };

  handleUpdateEntity = event => {
    this.setState({
      editing: false,
    });

    return this.props.updateEntity(event, this.props.model);
  };

  render() {
    const { model, entities } = this.props;
    const { editing, currentEntity } = this.state;

    return (
      <Fragment>
        <Row className='pt-2'>
          <Col className='text-center text-capitalize'>
            <h3>{model.title}</h3>
          </Col>
        </Row>
        <Row className='mt-3'>
          {editing ? (
            <Col className='text-center text-capitalize col-4 offset-4'>
              <h4>Edit {model.title}</h4>
              <UpdateForm
                  editing={editing}
                  setEditing={this.setEditing}
                  currentEntity={currentEntity}
                  updateEntity={this.handleUpdateEntity}
                  model={model}
                  entities={entities}
              />
            </Col>
          ) : (
            <Col className='text-center text-capitalize col-4 offset-4'>
              <h4>Add {model.title}</h4>
              <CreateForm
                model={model}
                entities={entities}
                addEntity={this.handleCreateEntity}
              />
            </Col>
          )}
        </Row>
        <Row className='mt-3'>
          <Col className='text-center text-capitalize col-4 offset-4'>
            <h3>View {model.url}</h3>
          </Col>
          <Col className='text-center text-capitalize col-10 offset-1'>
            <ViewTable
              model={model}
              entities={entities}
              deleteEntity={this.handleRemoveEntity}
              editRow={this.editRow}
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}