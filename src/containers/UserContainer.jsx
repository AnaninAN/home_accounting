import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, Button } from 'reactstrap';

import { signIn, signUp } from 'actions/user';
import { LoginForm } from 'components/LoginForm';
import { RegForm } from 'components/RegForm';

class UserContainer extends PureComponent {
  state = {
    isSignIn: true,
  };

  toggleForm = () => {
    this.setState({
      isSignIn: !this.state.isSignIn,
    });
  };

  render() {
    const { handleSignIn, handleSignUp, errors } = this.props;

    return (
      <Container className='d-flex justify-content-around flex-column w-25'>
        {this.state.isSignIn ? (
          <Fragment>
            <LoginForm handleSignIn={handleSignIn} errors={errors} />
            <Button onClick={this.toggleForm}>To Registration</Button>
          </Fragment>
        ) : (
          <Fragment>
            <RegForm handleSignUp={handleSignUp} errors={errors} />
            <Button onClick={this.toggleForm}>To Login</Button>
          </Fragment>)
        }
      </Container>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    ...props,
    errors: state.user.errors,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleSignIn: (user) => dispatch(signIn(user)),
    handleSignUp: (user) => dispatch(signUp(user)),
  }
}

export const UserRedux = connect(mapStateToProps, mapDispatchToProps)(UserContainer);