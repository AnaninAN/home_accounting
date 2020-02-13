import { createAction } from 'redux-actions';

export const errors = createAction('[User] Errors');

export const signIn = user => dispatch => {
  fetch('http://localhost/v1/users/auth', {
    method: 'POST',
    body : JSON.stringify({...user}),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        dispatch(errors({name: 'login', data: data.message}));
      } else {
        localStorage.setItem('token', data);
        window.location.href= '/';
      }
    });
  };

export const signUp = user => dispatch => {

};