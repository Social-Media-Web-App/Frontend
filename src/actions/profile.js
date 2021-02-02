import axios from 'axios'
import {setAlert} from './alert'
import {setLoader,removeLoader} from './loader'
import utils from '../utils/utils.json';
import {loadUser} from './auth'

export const getProfile = ({id}) => async(dispatch) => {
    dispatch(setLoader());
    try {
        const result = await axios.post(`${utils.BACKEND_URL}/profile`,{id});
        console.log(result.data[0]);
        dispatch({type:'Set_Profile',payload:result.data[0]});
        dispatch(removeLoader());
    } catch (error) {
      dispatch(removeLoader());
      if(error.response){
          const errors = error.response.data.errors;

          if (errors) {
              errors.forEach((error) => dispatch(setAlert({msg:error.msg,alertType:'danger'})));
          }
      }
    }
}