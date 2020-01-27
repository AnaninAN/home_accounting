import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import './assets/main.scss';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { Dashboard } from './components/Dashboard';
import { LoginForm } from './components/LoginForm';
import { Category } from "./components/_crud/Category";

class App extends React.Component {
    state = {token: localStorage.getItem('token')};
    handleSuccess = (token) => {
        this.setState({token}, () => {
            localStorage.setItem('token', token);
        });
    };
    handleSignOut = () => {
        this.setState({token: null}, () => {
            localStorage.clear();
        });
    };

    render() {
        return (
            <div>
                <p>Hello! It's a start of cool "Home accounting" app</p>
                {this.state.token &&
                    <Link to={'/auth'}>
                        <button onClick={this.handleSignOut}>Sign Out</button>
                    </Link>
                }
                <Link to={'/'}>Dashboard</Link>
                <Link to={'/crud'}>CRUD</Link>
                <DndProvider backend={Backend}>
                    <Switch>
                        <PrivateRoute path='/' component={Dashboard} exact/>
                        <PrivateRoute path='/crud' component={Category} exact/>
                        <Route path='/auth' render={(props) => <LoginForm {...props} onSuccess={this.handleSuccess}/>}/>
                    </Switch>
                </DndProvider>
            </div>
        );
    }
}
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);