import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import { load, create, remove, update } from 'actions/crud';

const initialState = {
    entities: new Map([
        ['category', ''],
        ['currency', ''],
        ['label', ''],
        ['account category', ''],
        ['account', ''],
    ]),
};

export const crudReducer = handleActions({
    [load]: (state, action) => ({
        entities: state.entities.set(action.payload.name, action.payload.data),
    }),
    [create]: (state, action) => ({
        entities: state.entities.setIn([action.payload.name, action.payload.data.id], action.payload.data),
    }),
    [remove]: (state, action) => ({
       entities: state.entities.deleteIn([action.payload.name, action.payload.id]),
    }),
    [update]: (state, action) => ({
        entities: state.entities.setIn([action.payload.name, action.payload.data.id], action.payload.data),
    }),
}, initialState);

