import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, Navbar, Button } from 'reactstrap';

import { Header } from 'components/Header';
import { CrudRedux } from 'containers/CrudContainer';
import { default as WidgetContainer} from 'containers/WidgetContainer';
import { init } from 'actions/dashboard';
import { category, currency, label, accountCategory, account, transaction } from 'models';

class DashboardContainer extends PureComponent {
  state = {
    crudVisible: false,
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username'),
  };

  models = [
    category,
    currency,
    label,
    accountCategory,
    account,
    transaction,
  ];

  componentDidMount() {
    const { loadEntities } = this.props;

    this.models.map((model) => loadEntities(model));
  }

  handleSignOut = () => {
    localStorage.clear();
    this.setState({
      token: '',
    });
  };

  toggleCrudVisibility = () => {
    this.setState(() => ({
      crudVisible: !this.state.crudVisible,
    }));
  };

  render() {
    const { token, crudVisible, username } = this.state;
    const { entities } = this.props;

    return (
      <>
        <Header token={token} handleSignOut={this.handleSignOut} username={username} />
        <Container fluid className='bg-secondary min-vh-100 position-relative overflow-auto'>
          <Navbar className='d-flex border-bottom'>
            <h4 className='text-light'>Management Panel</h4>
            <Button color='info' onClick={this.toggleCrudVisibility}>Toggle CRUD</Button>
          </Navbar>
          <h3 className='text-center p-2'>Dashboard</h3>
          <WidgetContainer entities={entities.get('account')} />

          { crudVisible && <CrudRedux models={this.models} /> }

        </Container>
      </>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    ...props,
    entities: state.crud.entities,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadEntities: (entity) => dispatch(init(entity)),
  }
}

export const DashboardRedux = connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);