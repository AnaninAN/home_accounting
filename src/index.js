import 'assets/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import { routes } from './routes';
import { store, history } from './store';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <DndProvider backend={Backend}>
        <Switch>
          {routes.map((route, idx) => <Route key={idx} {...route} />)}
        </Switch>
      </DndProvider>
    </ConnectedRouter>
  </Provider>,
document.getElementById('root')
);