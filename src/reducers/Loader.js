const initialState = {
    isActive : false
};

export default (state = initialState,action) => {
    const {type} = action;
    switch(type){
        case 'Set_Loader':
            return{
                ...state,
                isActive:true
            };
        case 'Remove_Loader':
        return{
            ...state,
            isActive:false
        };
        default:
        return state;
    }
}