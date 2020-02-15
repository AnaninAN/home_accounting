import './RegForm.scss';

import React, { PureComponent } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

export class RegForm extends PureComponent {
  state = {
    username: '',
    password: '',
    email: '',
  };

  handleTextEdit = ({ target: {name, value} }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSignUp = (event) => {
    const { handleSignUp  } = this.props;

    event.preventDefault();
    handleSignUp(this.state);
  };

  render() {
    const { username, password, email } = this.state;
    const { errors, toggleForm, clearErrors } = this.props;
    if (errors.length > 0 ) {
      setTimeout(clearErrors, 4000, 'signup');
    }

    return (
      <Container>
        <Form className='mt-5 border p-5 d-flex flex-column justify-content-center'>
          <h3 className='border-bottom text-center pb-2 mb-3'>Please Sign Up</h3>
          <FormGroup>
            <Label for='username'>Username</Label>
            <Input type='text' name='username' onChange={this.handleTextEdit} value={username}/>
          </FormGroup>
          <FormGroup>
            <Label for='password'>Password</Label>
            <Input type='password' name='password' onChange={this.handleTextEdit} value={password}/>
          </FormGroup>
          <FormGroup>
            <Label for='email'>Email</Label>
            <Input type='text' name='email' onChange={this.handleTextEdit} value={email}/>
          </FormGroup>
          {
              errors.length > 0 &&
              <Alert color="danger">
                {errors}
              </Alert>
          }
          <Button color='success' onClick={this.handleSignUp}>Sign Up</Button>
          <Button className='mt-3' onClick={toggleForm}>To Login</Button>
        </Form>
      </Container>
    );
  }
}