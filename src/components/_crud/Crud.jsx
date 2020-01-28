import React from 'react';
import {CreateForm} from './CreateForm';
import {Table} from './Table';
import {UpdateForm} from './UpdateForm';

export class Crud extends React.Component {
   state = {
            entities: [],
            editing: false,
            currentEntity: '',
        };

    componentDidMount() {
        fetch(`http://localhost/v1/${this.props.entity.url}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                return Promise.reject(new Error(response.statusText));
            }
        }).then(data => {
            this.setState({
                entities: data,
            });
        });
    }

    addEntity = (entity) => {
        fetch(`http://localhost/v1/${this.props.entity.url}`, {
            method: 'POST',
            body : JSON.stringify(entity),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(response => {
            if (response.status === 201) {
                return response.json();
            } else {
                return Promise.reject(new Error(response.statusText));
            }
        }).then(data => {
            const entities = this.state.entities.concat(data);
            this.setState(  {
                entities: entities,
            });
        });
    };

    deleteEntity = (id) => {
        this.setState({
            editing: false,
        });
        fetch(`http://localhost/v1/${this.props.entity.url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(response => {
            if (response.status === 204) {
                this.setState({
                    entities: this.state.entities.filter(entity => entity.id !== id),
                });
            } else {
                return Promise.reject(new Error(response.statusText));
            }
        });
    };

    updateEntity = (updatedEntity) => {
        this.setState({
            editing: false,
        });
        const id = updatedEntity.id;
        delete updatedEntity.id;

        fetch(`http://localhost/v1/${this.props.entity.url}/${id}`, {
            method: 'PATCH',
            body : JSON.stringify(updatedEntity),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                return Promise.reject(new Error(response.statusText));
            }
        }).then(data => {
            this.setState({
                entities: this.state.entities.map(entity => (entity.id === data.id ? data : entity)),
            });
        });
    };

    setEditing = (value) => {
        this.setState({
            editing: value,
        })
    };

    editRow = (entity) => {
        this.setState({
            editing: true,
            currentEntity: { id: entity.id, name: entity.name },
        });
    };

    render() {
        return (
            <div>
                <h1>{this.props.entity.title}</h1>
                <div>
                    <div>
                        {this.state.editing ? (
                            <div>
                                <h2>Edit {this.props.entity.title}</h2>
                                <UpdateForm
                                    editing={this.state.editing}
                                    setEditing={this.setEditing}
                                    currentEntity={this.state.currentEntity}
                                    updateEntity={this.updateEntity}
                                    entity={this.props.entity}
                                />
                            </div>
                        ) : (
                            <div>
                                <h2>Add {this.props.entity.title}</h2>
                                <CreateForm entity={this.props.entity} addEntity={this.addEntity} />
                            </div>
                        )}
                    </div>
                    <div>
                        <h2>View {this.props.entity.title}</h2>
                        <Table model={this.props.entity} entities={this.state.entities} deleteEntity={this.deleteEntity} editRow={this.editRow}/>
                    </div>
                </div>
            </div>
        )
    }

}


