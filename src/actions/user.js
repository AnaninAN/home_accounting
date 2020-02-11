export const signIn = user => dispatch => {
    fetch('http://localhost/v1/users/auth', {
            method: 'POST',
            body : JSON.stringify({...user}),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                return Promise.reject(new Error(response.statusText));
            }
        }).then(data => {
            localStorage.setItem('token', data);
            window.location.href= '/';
        });
};

export const signUp = user => dispatch => {
    
};