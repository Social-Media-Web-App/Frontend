const initialState = []

export default (state = initialState,action) => {
    const {type,payload} = action;
    switch(type){
        case 'Show_Post':
            return[
               ...payload
            ];
        case 'Delete_Post':
        return{
            ...state,
            isActive:false
        };
        default:
        return state;
    }
}