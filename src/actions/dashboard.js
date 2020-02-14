import { createAction } from 'redux-actions';

export const load = createAction('[Dashboard] Load');

export const init = entity => dispatch => {
  fetch(`http://localhost/v1/${entity.url}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    })
    .then(data => {
      data = data.reduce((acc, item) => {
        acc[item.id] = item;

        return acc;
      }, {});
      dispatch(load({name: entity.title, data}));
    });
};