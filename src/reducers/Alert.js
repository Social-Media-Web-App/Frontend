const initialState = []

export default (state = initialState,action) => {
    const {type,payload} = action;
    switch(type){
        case 'Set_Alert':
            return [
                ...state,
                payload
            ];
        case 'Remove_Alert':
        return state.filter((alert) => alert.id !== payload);
        default :
            return state;
    }
}