import './ViewTable.scss';

import React, { PureComponent } from 'react';
import { Table, Button } from 'reactstrap';

export class ViewTable extends PureComponent {
  handleDelete = id => () => {
    const { deleteEntity } = this.props;
    deleteEntity(id);
  }

  render() {
    const { model, entities, editRow } = this.props;

    const renderGrid = model => {
      if (typeof(model['dependencies']) !== 'undefined') {
        return (
          Array.from(entities.get(model.title).values()).map((entity => (
            <tr key={entity.id}>
              {
                Object.entries(entity).map(([key, value]) => {
                  if (key.includes('_id')) {
                    return (
                      <td key={key}>
                        {entities.getIn([key.replace('_', ' ').slice(0, -3), value.toString(), 'name'])}
                      </td>
                    );
                  } else {
                    return <td key={key}>{value}</td>
                  }
                }
                )
              }
              <td className='d-flex justify-content-around'>
                <Button onClick={editRow(entity)}>Edit</Button>
                <Button color='danger' onClick={this.handleDelete(entity.id)}>Delete</Button>
              </td>
            </tr>
          )))
        );
      } else {
        return (
          Array.from(entities.values()).map((entity => (
            <tr key={entity.id}>
              {
                Object.entries(entity).map(([key, value]) =>
                  <td key={key}>{value}</td>
                )
              }
              <td className='d-flex justify-content-around'>
                <Button onClick={editRow(entity)}>Edit</Button>
                <Button color='danger' onClick={this.handleDelete(entity.id)}>Delete</Button>
              </td>
            </tr>
          )))
        )
      }
    };

    return (
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            {
              model.properties.map(prop => {
                return <th key={prop}>{prop.replace('_id', '')}</th>
              })
            }
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            entities.size > 0 ?
            (
              renderGrid(model)
            ) : (
              <tr>
                <td>No {model.title}</td>
              </tr>
            )
          }
        </tbody>
      </Table>
    );
  }
}