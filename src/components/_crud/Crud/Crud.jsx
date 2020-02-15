import './Crud.scss';

import React, { PureComponent, Fragment } from 'react';
import { Row, Col, Alert } from 'reactstrap';

import { CreateForm } from 'crud/CreateForm';
import { ViewTable } from 'crud/ViewTable';
import { UpdateForm } from 'crud/UpdateForm';

export class Crud extends PureComponent {
  state = {
    editing: false,
    currentEntity: '',
  };

  setEditing = value => () => {
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
    const { model, createEntity } = this.props;

    return createEntity(event, model);
  };

  handleRemoveEntity = event => {
    const { model, removeEntity } = this.props;

    this.setState({
      editing: false,
    });

    return removeEntity(event, model);
  };

  handleUpdateEntity = event => {
    const { model, updateEntity } = this.props;

    this.setState({
      editing: false,
    });

    return updateEntity(event, model);
  };

  render() {
    const { model, entities, errors } = this.props;
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
        {
          errors.length > 0 && 
          <Row className='mt-3'>
            <Col className='col-6 offset-3'>
              <Alert color="danger">
                {Array.isArray(errors) ? (
                  <ul>
                  {errors.map((error, idx) => {
                    return <li key={idx}>{error.message}</li>
                  })}
                  </ul>
                ) : (errors)}
              </Alert>
            </Col>
          </Row>
        }
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