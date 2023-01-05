import { createStore } from 'redux';

import createReducer from './reducer';

export default function configureStore() {
    const store = createStore(
        createReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    );

    store.asyncReducers = {};

    return store;
}
