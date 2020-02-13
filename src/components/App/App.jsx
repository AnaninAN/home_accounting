import React, { PureComponent } from 'react';

import { Header } from 'containers/Header';
import { PrivateRoute } from 'components/PrivateRoute';
import { DashboardRedux } from 'containers/Dashboard';

export class App extends PureComponent {
  state = {
    token: localStorage.getItem('token'),
  };

  handleSignOut = () => {
    localStorage.clear();
    this.setState({
      token: '',
    });
  };

  render() {
    return (
      <div>
        <Header token={this.state.token} handleSignOut={this.handleSignOut}/>
        <PrivateRoute path='/' component={DashboardRedux} exact/>
      </div>
    );
  }
}