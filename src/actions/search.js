import axios from 'axios'
import {setAlert} from './alert'
import {setLoader,removeLoader} from './loader'
import utils from '../utils/utils.json';
import {loadUser} from './auth'

export const Search = ({term}) => async(dispatch) => {
         /* console.log(term); */
         dispatch(setLoader());
          try {
              const res = await axios.post(`${utils.BACKEND_URL}/search`,{term:term});
              /* console.log(res); */
              dispatch(removeLoader());
              dispatch(setAlert({msg:"Search Completed", alertType:'success'}));
              dispatch({type:'Search_Success',payload:res.data});
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