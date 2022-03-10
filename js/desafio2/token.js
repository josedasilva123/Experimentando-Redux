const FETCH_STARTED = 'token/FETCH_STARTED';
const FETCH_SUCESS =  'token/FETCH_SUCESS';
const FETCH_ERROR = 'token/FETCH_ERROR';

export const fetchStarted = () => ({ type: FETCH_STARTED });
export const fetchSucess = (payload) => ({ type: FETCH_SUCESS });
export const fetchError = (payload) => ({type: FETCH_ERROR});

const initialState = {
    loading: false,
    token: null,
    error: null,
}

export function fetchToken(token, url){
    return async (dispatch) => {
        try{
            dispatch({ type: 'FETCH_STARTED'});
            const data = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    auth: token,
                },
            });
            const json = await data.json();
            dispatch({ type: 'FETCH_SUCESS', payload: json});
        } catch (err) {
            dispatch({ type: 'FETCH_ERROR', payload: err.message});
        }
    }
}

function reducer(state = initialState, action){
    switch(action.type){
        case FETCH_STARTED: 
            return {...state, loading: true};
        case FETCH_SUCESS:
            return {...state, token: action.payload, loading: false};
        case FETCH_ERROR:
            return {...state, token: null, error: action.payload, loading: false };    
        default:
            return state;
    }
}

export default reducer;