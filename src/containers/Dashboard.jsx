import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, Navbar, Button } from 'reactstrap';

import { CrudRedux } from 'containers/CrudContainer';
import { default as WidgetContainer} from 'containers/WidgetContainer';
import { init } from 'actions/dashboard';
import { category, currency, label, accountCategory, account, transaction } from 'models';

class Dashboard extends PureComponent {

  state = {
    crudVisible: false,
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
    this.models.forEach(model => loadEntities(model));
  }

  toggleCrudVisibility = () => {
    this.setState(() => ({
      crudVisible: !this.state.crudVisible,
    }));
  };

  render() {
    return (
      <Container fluid className='bg-secondary min-vh-100 position-relative'>
        <Navbar className='d-flex border-bottom'>
          <h4 className='text-light'>Management Panel</h4>
          <Button color='info' onClick={this.toggleCrudVisibility}>Toggle CRUD</Button>
        </Navbar>
        <h3 className='text-center p-2'>Dashboard</h3>
        <WidgetContainer entities={this.props.entities.get('account')}/>
        {
          (this.state.crudVisible &&
            <CrudRedux models={this.models}/>
          )
        }
      </Container>
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

export const DashboardRedux = connect(mapStateToProps, mapDispatchToProps)(Dashboard);