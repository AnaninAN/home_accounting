import { createAction } from 'redux-actions';

export const errors = createAction('[User] Errors');
export const clearErrors = createAction('[User] Clear Errors');

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
        localStorage.setItem('token', data['token']);
        localStorage.setItem('username', data['username']);
        window.location.href= '/';
      }
    });
};

export const signUp = user => dispatch => {
  fetch('http://localhost/v1/users/sign-up', {
    method: 'POST',
    body : JSON.stringify({...user}),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (response.status === 200) {
          return response.json()
              .then(data => {
                localStorage.setItem('token', data['token']);
                localStorage.setItem('username', data['username']);
                window.location.href= '/';
              })
      } else {
          return response.json()
          .then(data => {
              if (data.message) {
                  dispatch(errors({name: 'signup', data: data.message}));
              }
          });
      }
    })
};