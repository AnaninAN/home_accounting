import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

import { Crud } from 'components/_crud/Crud';
import { createEntity, removeEntity, updateEntity, clearErrors } from 'actions/crud';

class CrudContainer extends PureComponent {
  state = {
    activeTab: 'category',
  };

  toggle = tab => () => {
    if(this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  renderCrud = model => {
    const { createEntity, removeEntity, updateEntity, clearErrors } = this.props;
    let { entities } = this.props;
    let errors = '';
    if (typeof(model['dependencies']) !== 'undefined') {
      entities = entities.filter((value, key) => 
        key === model.title || model['dependencies'].includes(key)
      );
    entities.keySeq().forEach(key => {
      if (entities.hasIn([key, 'errors'])) {
        if (key === model.title) {
          errors = entities.getIn([model.title, 'errors']);
          setTimeout(clearErrors, 5000, model);
        }
        entities = entities.deleteIn([key, 'errors']);
      }
    }); 
    } else {
      entities = entities.get(model.title);
      if (entities.has('errors')) {
        errors = entities.get('errors');
        entities = entities.delete('errors');
        setTimeout(clearErrors, 5000, model);
      }
    }
    
    return <Crud
      model={model}
      entities={entities}
      createEntity={createEntity}
      removeEntity={removeEntity}
      updateEntity={updateEntity}
      errors={errors}
    />
  };

  render() {
    const { models } = this.props;

    return (
      <Container className='border bg-light w-50 position-absolute' style={{ top: 150, right: 50 }}>
        <Nav tabs className='d-flex justify-content-around'>
          {models.map(model => (
            <NavItem key={model.title}>
              <NavLink className='text-capitalize' onClick={this.toggle(model.title)}>
                {model.title}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        {models.map(model => (
          <TabContent activeTab={this.state.activeTab} key={model.title}>
            <TabPane tabId={model.title}>
              {this.renderCrud(model)}
            </TabPane>
          </TabContent>))}
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    ...props,
    entities: state.crud.entities,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createEntity: (entity, model) => dispatch(createEntity(entity, model)),
    removeEntity: (id, model) => dispatch(removeEntity(id, model)),
    updateEntity: (entity, model) => dispatch(updateEntity(entity, model)),
    clearErrors: (model) => dispatch(clearErrors({name: model.title})),
  }
}

export const CrudRedux = connect(mapStateToProps, mapDispatchToProps)(CrudContainer);