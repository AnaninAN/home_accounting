import { createAction } from 'redux-actions';

import { init } from './dashboard';
import { account } from 'models';

export const create = createAction('[CRUD] Create');
export const remove = createAction('[CRUD] Remove');
export const update = createAction('[CRUD] Update');
export const errors = createAction('[CRUD] Errors');
export const clearErrors = createAction('[CRUD] Clear Errors');

export const createEntity = (entity, model) => dispatch => {
    fetch(`http://localhost/v1/${model.url}`, {
        method: 'POST',
        body : JSON.stringify(entity),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    }).then(response => {
        if (response.status === 201) {
            return response.json()
                .then(data => {
                    dispatch(create({name: model.title, data}));
                    if (model.title === 'transaction') dispatch(init(account));
                });
        } else if (response.status === 422) {
            return response.json()
                .then(data => {
                    dispatch(errors({name: model.title, data}));
                });
        } else {
            return response.json()
                .then(data => {
                    if (data.message) {
                        dispatch(errors({name: model.title, data: data.message}));
                }
            });
        }
    })
};

export const removeEntity = (id, model) => dispatch => {
    fetch(`http://localhost/v1/${model.url}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    }).then(response => {
        if (response.status === 204) {
            dispatch(remove({name: model.title, id}));
            if (model.title === 'transaction') dispatch(init(account));
        } else {
            return response.json()
            .then(data => {
                if (data.message) {
                    dispatch(errors({name: model.title, data: data.message}));
                }
            });
        }
    });
};

export const updateEntity = (updatedEntity, model) => dispatch => {
    const id = updatedEntity.id;
    delete updatedEntity.id;

    fetch(`http://localhost/v1/${model.url}/${id}`, {
        method: 'PATCH',
        body : JSON.stringify(updatedEntity),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    }).then(response => {
        if (response.status === 200) {
            return response.json()
                .then(data => {
                    dispatch(update({name: model.title, data}));
                    if (model.title === 'transaction') dispatch(init(account));
                })
        } else if (response.status === 422) {
            return response.json()
                .then(data => {
                    dispatch(errors({name: model.title, data}));
                });
        } else {
            return response.json()
            .then(data => {
                if (data.message) {
                    dispatch(errors({name: model.title, data: data.message}));
                }
            });
        }
    })
}