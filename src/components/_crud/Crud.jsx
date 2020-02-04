import React, {Fragment} from 'react';
import {Row, Col} from 'reactstrap';
import {CreateForm} from './CreateForm';
import {ViewTable} from './ViewTable';
import {UpdateForm} from './UpdateForm';

export class Crud extends React.Component {

    state = {
        editing: false,
        currentEntity: '',
    };

    setEditing = value => {
        this.setState({
            editing: value,
        })
    };

    editRow = entity => {
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
        return (
            <Fragment>
                <Row className='pt-2'>
                    <Col className='text-center text-capitalize'>
                        <h3>{this.props.model.title}</h3>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    {this.state.editing ? (
                        <Col className='text-center text-capitalize col-4 offset-4'>
                            <h4>Edit {this.props.model.title}</h4>
                            <UpdateForm
                                editing={this.state.editing}
                                setEditing={this.setEditing}
                                currentEntity={this.state.currentEntity}
                                updateEntity={this.handleUpdateEntity}
                                model={this.props.model}
                            />
                        </Col>
                    ) : (
                        <Col className='text-center text-capitalize col-4 offset-4'>
                            <h4>Add {this.props.model.title}</h4>
                            <CreateForm model={this.props.model} addEntity={this.handleCreateEntity}/>
                        </Col>
                    )}
                </Row>
                <Row className='mt-3'>
                    <Col className='text-center text-capitalize col-4 offset-4'>
                        <h3>View {this.props.model.url}</h3>
                    </Col>
                    <Col className='text-center text-capitalize col-10 offset-1'>
                        <ViewTable
                            model={this.props.model}
                            entities={this.props.entities}
                            deleteEntity={this.handleRemoveEntity}
                            editRow={this.editRow}
                        />
                    </Col>
                </Row>
            </Fragment>
        )
    }
}


