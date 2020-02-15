import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import { errors, clearErrors } from 'actions/user';

const initialState = {
    errors: new Map(),
};

export const userReducer = handleActions({
    [errors]: (state, action) => ({
        errors: state.errors.set(action.payload.name, action.payload.data),
    }),
    [clearErrors]: (state, action) => ({
        errors: state.errors.delete(action.payload),
    }),
}, initialState);