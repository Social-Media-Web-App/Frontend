import axios from 'axios'
import {setAlert} from './alert'
import {setLoader,removeLoader} from './loader'
import utils from '../utils/utils.json';
import {loadUser} from './auth'

export const uploadImage = (avatar) => async(dispatch) => {
    dispatch(setLoader());
    const formData = new FormData();
    formData.append('file', avatar);
    formData.append('upload_preset', 'tfxiqkad');
  /*   console.log("reached here to upload image :",avatar); */
    delete axios.defaults.headers.common['x-auth-token'];
      try {
          const uploadRes = await axios.post(utils.IMAGE_UPLOAD_URL,formData);
          axios.defaults.headers.common['x-auth-token'] = localStorage.token;
          const imageUrl = uploadRes.data.secure_url;
         /*  console.log("IMAGE UPLOADED :",imageUrl); */
          const saveUrl = await axios.post(`${utils.BACKEND_URL}/update/avatar`,{imageUrl});
          dispatch(removeLoader());
          dispatch(loadUser('/settings'));
          dispatch(setAlert({msg:saveUrl.data, alertType:'success'}));
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


export const updateUser = ({name,newPassword,currentPassword}) => async(dispatch) => {
        dispatch(setLoader());
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({name,newPassword,currentPassword});
        try {
            const updateRes = await axios.post(`${utils.BACKEND_URL}/update/user`,body,config);
            dispatch(removeLoader());
            dispatch(loadUser('/settings'));
            dispatch(setAlert({msg:updateRes.data, alertType:'success'}));
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