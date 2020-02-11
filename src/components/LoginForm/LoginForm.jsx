import React from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import './LoginForm.scss';

export class LoginForm extends React.Component {

    state = {
        username: '',
        password: '',
    };

    handleTextEdit = ({target: {name, value}}) => {
        this.setState({
            [name]: value,
        })
    };

    handleSignIn = () => {
        event.preventDefault();
        this.props.handleSignIn(this.state);
    };

    render() {
        const {username, password} = this.state;
        const { errors } = this.props;
        return (
            <Container>
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
                    {
                        errors.size > 0 && 
                        <Alert color="danger">
                            {errors.get('login')}
                        </Alert>
                    }
                    <Button color='success' onClick={this.handleSignIn}>Sign In</Button>
                </Form>
            </Container>
        )
    }
}