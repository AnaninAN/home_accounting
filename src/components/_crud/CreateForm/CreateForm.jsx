import './CreateForm.scss';

import React, { PureComponent, Fragment } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

export class CreateForm extends PureComponent {
  state = {
    entity: {},
  };

  handleInputChange = event => {
    const { name, value } = event.currentTarget;

    this.setState((prevState) => ({
      entity: {...prevState.entity, [name]: value},
    }));
  }

  handleSubmit = event => {
    const { addEntity } = this.props;
    const { entity } = this.state;

    event.preventDefault();
    addEntity(entity);
    this.setState({
      entity: {},
    });
  };

  render() {
    const { model, entities } = this.props;
    const { entity } = this.state;

    const renderInput = prop => {
      if (prop.includes('_id')) {
          return (
            <Fragment>
              <Label for={prop}>{prop.replace('_id', '')}</Label>
              <Input type="select" name={prop} id={prop} onChange={this.handleInputChange}>
              <option value=''>Select .....</option>
                {
                  Array.from(entities.get(prop.replace('_', ' ').slice(0, -3)).values()).map(entity => {
                      return <option key={entity.id} value={entity.id}>{entity.name}</option>
                  })
                }
              </Input>
            </Fragment>
          )
      } else if (prop.includes('date')) {
          return (
            <Fragment>
              <Label for={prop}>{prop}</Label>
              <Input type='date' name={prop} value={entity.prop}
                onChange={this.handleInputChange}/>
            </Fragment>
          )
      } else {
        return (
          <Fragment>
            <Label for={prop}>{prop}</Label>
            <Input type='text' name={prop} value={entity.prop}
              onChange={this.handleInputChange}/>
          </Fragment>
        )
      }
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        {
          model.properties.map(prop => {
            return (
              <FormGroup className='text-left' key={prop}>
                {renderInput(prop)}
              </FormGroup>
            )
          })
        }
        <Button>Add new {model.title}</Button>
      </Form>
    );
  }
}