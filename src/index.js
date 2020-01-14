import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.scss';
import { Widget } from './components/Widget';

class App extends React.Component {
    render() {
        return (
            <div>
                <p>Hello! It's a start of cool "Home accounting" app</p>
                <Widget class='balance-widget' name='Balance'/>

            </div>
        );
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
);