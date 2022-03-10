import token, {fetchToken} from './token';
import user, {fetchUser} from './user';
import thunk from './middleware/thunk.js';
import localStorage from './middleware/localStorage.js';

const {applyMiddleware, compose} = Redux;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, localStorage));

const store = Redux.createStore({token, user}, enhancer);

store.dispatch(
    fetchUser('https://pokeapi.co/api/v2/pokemon/ditto'),
);

store.dispatch(
    fetchToken('https://pokeapi.co/api/v2/pokemon/ditto'),
);

export default store;