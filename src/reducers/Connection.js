const initialState = {
    following : null,
    followers : null
};

export default (state = initialState,action) => {
     const { type,payload} = action;
     switch(type){
         case 'Set_Followers':
             return {
                 ...state,
                 followers : payload
             };
        case 'Set_Following':
            return {
                ...state,
                following : payload
            };
        default:
            return state;
     }
}