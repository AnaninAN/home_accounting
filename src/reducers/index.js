import { combineReducers } from 'redux';

import { crudReducer } from './crud';

export const rootReducer = combineReducers({
    crud: crudReducer,
});