import { createAction } from 'redux-actions';

export const load = createAction('[Dashboard] Load');

export const init = entity => dispatch => {
    fetch(`http://localhost/v1/${entity.url}`, {
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
        data = data.reduce((obj, item) => Object.assign(obj, { [item.id]: item }) ,{});
        dispatch(load({name: entity.title, data}));
    });
};