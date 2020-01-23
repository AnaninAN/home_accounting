import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.scss';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { Dashboard } from './components/Dashboard';
import { LoginForm } from './components/LoginForm';

class App extends React.Component {
    state = {token: null};
    handleSuccess = (token) => {
        this.setState({token});
    };

    render() {
        return (
            <div>
                <p>Hello! It's a start of cool "Home accounting" app</p>
                <DndProvider backend={Backend}>
                    {!this.state.token && <LoginForm onSuccess={this.handleSuccess}/>}
                    {this.state.token && <Dashboard/>}
                </DndProvider>
            </div>

        );
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
);