import React from 'react';
import  { connect } from 'react-redux';
import {Container, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';

import { Crud } from '../components/_crud/Crud';

import {createEntity, init, removeEntity, updateEntity} from 'actions/crud';

import {category, currency, accountCategory, label, account} from '../components/_models';

class CrudContainer extends React.Component {

    state = {
        activeTab: 'category',
    };

    models = [
        category,
        currency,
        label,
        accountCategory,
        account,
    ];

    componentDidMount() {
        const { loadEntities } = this.props;
        this.models.forEach(model => loadEntities(model));
    }

    toggle = tab => {
        if(this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    };

    render() {
        const { createEntity, removeEntity, updateEntity, entities } = this.props;
        return (
            <Container className='float-right border bg-light w-50'>
                <Nav tabs className='d-flex justify-content-around'>
                    {(this.models.map(model => (
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
                {(this.models.map(model => (
                        <TabContent activeTab={this.state.activeTab} key={model.title}>
                            <TabPane tabId={model.title}>
                                <Crud
                                    model={model}
                                    entities={Object.values(entities.get(model.title))}
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
        loadEntities: (entity) => dispatch(init(entity)),
        createEntity: (entity, model) => dispatch(createEntity(entity, model)),
        removeEntity: (id, model) => dispatch(removeEntity(id, model)),
        updateEntity: (entity, model) => dispatch(updateEntity(entity, model)),
    }
}

export const CrudRedux = connect(mapStateToProps, mapDispatchToProps)(CrudContainer);