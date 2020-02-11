import { combineReducers } from 'redux';

import { crudReducer } from './crud';
import { userReducer } from './user';

export const rootReducer = combineReducers({
    crud: crudReducer,
    user: userReducer,
});