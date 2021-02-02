const initialState = null;

export default (state = initialState,action) => {
        const {type,payload} = action;
        switch(type){
            case 'Set_Profile':
                return payload;
            default:
                return state;
        }
}