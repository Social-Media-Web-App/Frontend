import axios from 'axios'
import {setAlert} from './alert'
import {setLoader,removeLoader} from './loader'
import utils from '../utils/utils.json';
import {loadUser} from './auth'

export const getConnections = () => async(dispatch) => {
    dispatch(setLoader());
    try {
        const result = await axios.get(`${utils.BACKEND_URL}/profile/connections`);
        /* console.log(result.data); */
        dispatch({type:'Set_Connections',payload:result.data});
        dispatch(removeLoader());
    } catch (error) {
      if(error.response){
          const errors = error.response.data.errors;
          dispatch(removeLoader());
          if (errors) {
              errors.forEach((error) => dispatch(setAlert({msg:error.msg,alertType:'danger'})));
          }
      }
    }
}

