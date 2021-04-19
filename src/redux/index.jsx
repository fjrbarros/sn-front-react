import { createStore as create, combineReducers } from 'redux';
import AppBarText from './appbar/Reducers';

function createStore() {
    const reducers = combineReducers({ AppBarText });

    return create(reducers);
}

export default createStore();