const initialState = null

export default (state = initialState,action) => {
    const {type,payload} = action;
    switch(type){
        case 'Edit_Post_Alert':
            return payload;
        case 'Edit_Post_Remove_Alert':
            return null;
        default:
        return state;
    }
}