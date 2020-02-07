import React from 'react';
import  { connect } from 'react-redux';
import {Container, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';

import { Crud } from '../components/_crud/Crud';

import {createEntity, removeEntity, updateEntity} from 'actions/crud';

class CrudContainer extends React.Component {

    state = {
        activeTab: 'category',
    };

    toggle = tab => {
        if(this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    };

    render() {
        const { createEntity, removeEntity, updateEntity, entities, models } = this.props;
        return (
            <Container className='border bg-light w-50 position-absolute' style={{ top: 150, right: 50 }}>
                <Nav tabs className='d-flex justify-content-around'>
                    {(Object.values(models).map(model => (
                            <NavItem key={model.title}>
                                <NavLink className='text-capitalize' onClick={() => {
                                    this.toggle(model.title);
                                }}>
                                    {model.title}
                                </NavLink>
                            </NavItem>
                        ))
                    )}
                </Nav>
                {(Object.values(models).map(model => (
                        <TabContent activeTab={this.state.activeTab} key={model.title}>
                            <TabPane tabId={model.title}>
                                <Crud
                                    model={model}
                                    entities={entities.get(model.title)}
                                    createEntity={createEntity}
                                    removeEntity={removeEntity}
                                    updateEntity={updateEntity}
                                />
                            </TabPane>
                        </TabContent>
                    ))
                )}
            </Container>
        )
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
    }
}

export const CrudRedux = connect(mapStateToProps, mapDispatchToProps)(CrudContainer);