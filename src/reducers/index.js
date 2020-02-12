import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { crudReducer } from 'reducers/crud';
import { userReducer } from 'reducers/user';

export const initReducer = history => combineReducers({
    router: connectRouter(history),
    crud: crudReducer,
    user: userReducer,
});