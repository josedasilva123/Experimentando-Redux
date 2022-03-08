const COMPLETAR_AULA = 'aluno/COMPLETAR_AULA'
const COMPLETAR_CURSO = 'aluno/COMPLETAR_CURSO'
const RESETAR_CURSO =  'contador/RESETAR_CURSO'

export const completarAula = (payload) => ({type: COMPLETAR_AULA, payload})
export const completarCurso = (payload) => ({type: COMPLETAR_CURSO, payload })
export const resetarCurso = (payload) => ({type: RESETAR_CURSO, payload});

const initialState = [
    {
        id: 1,
        nome: 'Design',
        completa: true,
    },
    {
        id: 2,
        nome: 'HTML',
        completa: false,
    },
    {
        id: 3,
        nome: 'Javascript',
        completa: false,
    }
]

const reducer = immer.produce((state, action) => {
    switch(action.type){
        case COMPLETAR_AULA:
            const index = state.findIndex((x) => x.id === action.payload);
            if(!isNaN(index) && state[index]) state[index].completa = true;
            break;
        case COMPLETAR_CURSO:   
            state.forEach((aula) => aula.completa = true);
        case RESETAR_CURSO:
            state.forEach((aula) => aula.completa = false);
            break;
    }
}, initialState);

export default reducer;