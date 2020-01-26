import React from 'react';
import './LoginForm.scss';

export class LoginForm extends React.Component {

        state = {
            username: '',
            password: '',
        };

    handleSignIn = () => {
        const { username, password} = this.state;
        const { onSuccess } = this.props;
        fetch('http://localhost/v1/users/auth', {
            method: 'POST',
            body : JSON.stringify({username, password}),
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
            onSuccess(data);
            this.props.history.push('/');
        });

    };
    handleTextEdit = ({target: {name, value}}) => {
        this.setState({
            [name]: value,
        })
    };

    render() {
        const {username, password} = this.state;
        return (
            <div>
                <input type='text' name='username' onChange={this.handleTextEdit} value={username}/>
                <input type='password' name='password' onChange={this.handleTextEdit} value={password}/>
                <button onClick={this.handleSignIn}>Sign In</button>
            </div>
        )
    }
}