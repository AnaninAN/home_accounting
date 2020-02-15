import './LoginForm.scss';

import React, { PureComponent } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

export class LoginForm extends PureComponent {
  state = {
    username: '',
    password: '',
  };

  handleTextEdit = ({ target: {name, value} }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSignIn = (event) => {
    const {handleSignIn  } = this.props;

    event.preventDefault();
    handleSignIn(this.state);
  };

  render() {
    const { username, password } = this.state;
    const { errors, toggleForm, clearErrors } = this.props;
    if (errors.length > 0 ) {
      setTimeout(clearErrors, 4000, 'login');
    }

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
              errors.length > 0 &&
              <Alert color="danger">
                {errors}
              </Alert>
          }
          <Button color='success' onClick={this.handleSignIn}>Sign In</Button>
          <Button className='mt-3' onClick={toggleForm}>To Registration</Button>
        </Form>
      </Container>
    );
  }
}