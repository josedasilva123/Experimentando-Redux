const FETCH_STARTED = 'user/FETCH_STARTED';
const FETCH_SUCESS =  'user/FETCH_SUCESS';
const FETCH_ERROR = 'user/FETCH_ERROR';

export const fetchStarted = () => ({ type: FETCH_STARTED });
export const fetchSucess = (payload) => ({ type: FETCH_SUCESS });
export const fetchError = (payload) => ({type: FETCH_ERROR});

const initialState = {
    loading: false,
    user: null,
    error: null,
}

function reducer(state = initialState, action){
    switch(action.type){
        case FETCH_STARTED: 
            return {...state, loading: true};
        case FETCH_SUCESS:
            return {...state, user: action.payload, loading: false};
        case FETCH_ERROR:
            return {...state, user: null, error: action.payload, loading: false };    
        default:
            return state;
    }
}

export function fetchUser(user, url){
    return async (dispatch) => {
        try{
            dispatch({ type: 'FETCH_STARTED'});
            const data = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user,
                })
            });
            const json = await data.json();
            dispatch({ type: 'FETCH_SUCESS', payload: json});
        } catch (err) {
            dispatch({ type: 'FETCH_ERROR', payload: err.message});
        }
    }
}
export default reducer;