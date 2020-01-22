import React from 'react';
import './LoginForm.scss';

export class LoginForm extends React.Component {
    state = {
        username: '',
        password: '',
    };

    handleSignIn = () => {
        const { username, password} = this.state;
        fetch('http://localhost/v1/users/auth', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',

            },
            body : JSON.stringify({username, password}),
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
            });

    }

    handleTextEdit = ({target: {name, value}}) => {
        this.setState({
            [name]: value,
        })
    }

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