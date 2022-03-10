function getLocalStorage(key, initial){
    try {
        return (window.localStorage.getItem(key))
    } catch (err) {
        return initial;
    }
}

const initialState = {
    loading: false,
    data: getLocalStorage('key', null),
    error: null,
}

function reducer(state = initialState, action){
    switch(action.type) {
        case 'FETCH_STARTED':
            return {...state, loading: true};
        case 'FETCH_SUCESS':
            return {...state, loading: false, data: action.payload} 
        case 'FETCH_ERROR':
            return {...state, loading: false, data: null, error: action.payload}      
        default:
            return state;      
    }
}

const thunk =  (store) => (next) => (action) => {
    if(typeof action === "function"){
        return action(store.dispatch);
    }
    return next(action);
}

const localStorage = (store) => (next) => (action) => {
    if(action.localStorage !== undefined){
        window.localStorage.setItem(action.localStorage, JSON.stringify(action.payload));
    }
    return next(action);
}

const {applyMiddleware, compose} = Redux;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, localStorage));

const store = Redux.createStore(reducer, enhancer);

function fetchUrl(url){
    return async (dispatch) => {
        try {
            dispatch({ type: 'FETCH_STARTED'});
            const data = await fetch(url);
            const json = await data.json();
            dispatch({ type: 'FETCH_SUCESS', payload: json, localStorage: 'key' })
        } catch (err) {
            dispatch({ type: 'FETCH_ERROR', payload: err.message })
        }
    }
}
const state = store.getState();
if (state.data === null){
    store.dispatch(
        fetchUrl('https://pokeapi.co/api/v2/pokemon/ditto'),
    );
    
}
console.log(state);
/*
const logger = (store) => (next) => (action) => {
    console.group(action.type);
    console.log('ACTION', action);
    next(action);
    console.log('STATE', store.getState());
    console.groupEnd();
}

const teste = (store) => (next) => (action) =>{
    if(action.type == 'REDUZIR'){
        window.alert('REDUZIU');
    }
    return next(action);
}
*/


/*
store.dispatch({ type: 'INCREMENTAR'});
store.dispatch({ type: 'INCREMENTAR'});
store.dispatch({ type: 'REDUZIR'});
*/