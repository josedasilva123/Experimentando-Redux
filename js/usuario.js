const SET_USER = 'usuario/SET_USER';
const COMPLETE_CLASS = 'usuario/COMPLETE_CLASS';
const CHANGE_NAME = 'usuario/CHANGE_NAME';

export const setUser = (user) => ({type: SET_USER, payload: user});
export const completeClass = (id) => ({type: COMPLETE_CLASS, payload: id});
export const changeName = (name) => ({type: CHANGE_NAME, payload: name});

const reducer = immer.produce((state, action) => {
    switch(action.type){
        case SET_USER:
            state = action.payload;
            break;
        case COMPLETE_CLASS:   
            if (state && state.classes){
                state.classes = [...classes, action.payload]
            } else if (state){
                state.classes = [action.payload]
            }
            break;
        case CHANGE_NAME:
            if(state) state.nome = action.payload;  
            break;
    }
}, null);

export default reducer;