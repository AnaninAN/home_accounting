import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';

import { logger } from 'redux-logger';

import { initReducer } from 'reducers';

export const history = createBrowserHistory();

export const store = createStore(
  initReducer(history),
  applyMiddleware(logger, routerMiddleware(history), thunk)
);