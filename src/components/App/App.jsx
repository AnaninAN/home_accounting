import React, { PureComponent } from 'react';

import { Header } from 'containers/Header';
import { PrivateRoute } from 'components/PrivateRoute';
import { DashboardRedux } from 'containers/Dashboard';

class App extends PureComponent {
  state = {token: localStorage.getItem('token')};

  handleSignOut = () => {
  this.setState({token: null}, () => {
    localStorage.clear();
  });
  };

  render() {
    return (
      <div>
        <Header token={this.state.token} handleSignOut={this.handleSignOut}/>
      </div>
    );
  }
}