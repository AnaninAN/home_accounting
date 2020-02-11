import './assets/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PrivateRoute } from 'components/PrivateRoute';

import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import { store } from './store';
import { Header } from 'containers/Header';
import { DashboardRedux } from 'containers/Dashboard';
import { UserRedux } from './containers/UserContainer';

class App extends React.Component {
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
                <DndProvider backend={Backend}>
                    <Switch>
                        <PrivateRoute path='/' component={DashboardRedux} exact/>
                        <Route path='/auth' component={UserRedux}/>
                    </Switch>
                </DndProvider>
            </div>
        );
    }
}
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);