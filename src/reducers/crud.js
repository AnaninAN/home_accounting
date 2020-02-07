import { handleActions } from 'redux-actions';
import {fromJS, Map} from 'immutable';

import { create, remove, update } from 'actions/crud';
import { load } from 'actions/dashboard';

const initialState = {
    entities: new Map([
        ['category', new Map],
        ['currency', new Map],
        ['label', new Map],
        ['account category', new Map],
        ['account', new Map],
    ]),
};

export const crudReducer = handleActions({
    [load]: (state, action) => ({
        entities: state.entities.set(action.payload.name, new Map(action.payload.data)),
    }),
    [create]: (state, action) => ({
        entities: state.entities.setIn([action.payload.name, action.payload.data.id.toString()], action.payload.data),
    }),
    [remove]: (state, action) => ({
       entities: state.entities.deleteIn([action.payload.name, action.payload.id.toString()]),
    }),
    [update]: (state, action) => ({
        entities: state.entities.setIn([action.payload.name, action.payload.data.id.toString()], action.payload.data),
    }),
}, initialState);

