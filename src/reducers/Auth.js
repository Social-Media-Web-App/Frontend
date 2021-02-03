const initialState = {
    token:localStorage.getItem('token'),
    isAuthenticated : false,
    user : null
};

export default (state = initialState,action) => {
       const {type,payload} = action;
       switch(type){
             case 'Auth_Success':
                 return {
                     ...state,
                     isAuthenticated : true,
                     user:payload.data
                 };
             case 'Register_Success': 
             case 'Login_Success': 
             localStorage.setItem('token',payload.token)
             return{ ...state,
                     token : localStorage.getItem('token'),
                     isAuthenticated : true
             };

             case 'Register_Fail':
             case 'Login_Fail':
             case 'Auth_Fail':
             case 'Logout':
                localStorage.removeItem('token')
                 return{
                     ...state,
                     token:null,
                     isAuthenticated :false,
                     user : null
                 };
            default: 
            return state;
       }
       
}