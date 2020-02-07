import { createAction } from 'redux-actions';

export const create = createAction('[CRUD] Create');
export const remove = createAction('[CRUD] Remove');
export const update = createAction('[CRUD] Update');

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
            return response.json();
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }).then(data => {
        dispatch(create({name: model.title, data}));
    });
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
        } else {
            return Promise.reject(new Error(response.statusText));
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
            return response.json();
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }).then(data => {
        dispatch(update({name: model.title, data}));
    });
};
