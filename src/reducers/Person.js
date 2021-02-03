const initialState = {
    profile : null,
    followinfo : null
};

export default (state = initialState,action) => {
        const {type,payload} = action;
        switch(type){
            case 'Set_Profile':
                return {
                    ...state,
                    profile : payload
                };
            case 'FollowInfo':
                return {
                    ...state,
                    followinfo:payload
                };
            default:
                return state;
        }
}