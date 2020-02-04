import React from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
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
            <Container className='w-25'>
                <Form className='mt-5 border p-5 d-flex flex-column justify-content-center'>
                    <h3 className='border-bottom text-center pb-2 mb-3'>Please Sign In</h3>
                    <FormGroup>
                        <Label for='username'>Username</Label>
                        <Input type='text' name='username' onChange={this.handleTextEdit} value={username}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password</Label>
                        <Input type='password' name='password' onChange={this.handleTextEdit} value={password}/>
                    </FormGroup>
                    <Button color='success' onClick={this.handleSignIn}>Sign In</Button>
                </Form>
            </Container>
        )
    }
}