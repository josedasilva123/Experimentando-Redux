import usuario from './usuario.js'

const reducer = Redux.combineReducers({usuario});

const store = Redux.createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;