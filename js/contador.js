const INCREMENTAR = 'contador/INCREMENTAR'
const DIMINUIR =  'contador/DIMINUIR'
const SOMAR = 'contador/DIMINUIR'

export const incrementar = () => ({type: INCREMENTAR})
export const reduzir = () => ({type: DIMINUIR })
export const somar = (payload) => ({type: SOMAR, payload})

const reducer = immer.produce((state, action) => {
    switch(action.type){
        case INCREMENTAR:
            return state + 1;
            break;
        case DIMINUIR:
            return state - 1;
            break;
        case SOMAR: 
            return state + action.payload;
            break; 
    }
}, 0);

export default reducer;