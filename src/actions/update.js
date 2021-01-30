import axios from 'axios'
import {setAlert} from './alert'
import {setLoader,removeLoader} from './loader'
import utils from '../utils/utils.json';
import {loadUser} from './auth'

export const uploadImage = (avatar) => async(dispatch) => {
    setLoader();
    const formData = new FormData();
      formData.append(
        "avatar",
        avatar,
        avatar.name
      );
      try {
          const uploadRes = await axios.post(`${utils.BACKEND_URL}/update/avatar`,formData);
          dispatch(loadUser('/settings'));
          dispatch(setAlert({msg:uploadRes.data, alertType:'success'}));
      } catch (error) {
        removeLoader();
        if(error.response){
            const errors = error.response.data.errors;

            if (errors) {
                errors.forEach((error) => dispatch(setAlert({msg:error.msg,alertType:'danger'})));
            }
        }
      }
}