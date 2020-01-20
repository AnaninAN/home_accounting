import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.scss';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { Dashboard } from './components/Dashboard';

class App extends React.Component {
    render() {
        return (
            <div>
                <p>Hello! It's a start of cool "Home accounting" app</p>
                <DndProvider backend={Backend}>
                    <Dashboard/>
                </DndProvider>
            </div>

        );
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
);