const initialstate = {
    connection:[],
    chats : []
}

export default (state=initialstate,action) => {
       const {type,payload} = action;
       switch(type){
           case 'Set_Chat_Connections':
               return {
                   ...state,
                   connection:payload[0].connections
               };
            case 'Set_Chats':
            return {
                ...state,
                chats:payload
            }
            default:
                return state;
       }
}