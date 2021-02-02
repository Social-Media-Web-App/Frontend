const initialState = null;

export default (state = initialState,action) => {
    const {type,payload} = action;
    switch(type){
        case 'Search_Success':
            return payload;
        default:
            return state;
    }
}