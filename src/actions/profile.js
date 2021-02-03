import axios from 'axios'
import {setAlert} from './alert'
import {setLoader,removeLoader} from './loader'
import utils from '../utils/utils.json';
import {loadUser} from './auth'

export const getProfile = ({personid}) => async(dispatch) => {
    dispatch(setLoader());
    try {
        const result = await axios.post(`${utils.BACKEND_URL}/profile`,{personid});
       /*  console.log(result.data) */;
        dispatch(FollowInfo({personid}));
        dispatch({type:'Set_Profile',payload:result.data});
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

export const FollowInfo = ({personid}) => async(dispatch) => {
    try {
        const result = await axios.post(`${utils.BACKEND_URL}/profile/followinfo`,{personid});
        dispatch({type:'FollowInfo',payload:result.data});
    } catch (error) {
      if(error.response){
          const errors = error.response.data.errors;

          if (errors) {
              errors.forEach((error) => dispatch(setAlert({msg:error.msg,alertType:'danger'})));
          }
      }
    }
}

export const Follow = ({personid}) => async(dispatch) => {
    try {
        const result = await axios.post(`${utils.BACKEND_URL}/profile/follow`,{personid});
        dispatch(FollowInfo({personid}));
    } catch (error) {
      if(error.response){
          const errors = error.response.data.errors;

          if (errors) {
              errors.forEach((error) => dispatch(setAlert({msg:error.msg,alertType:'danger'})));
          }
      }
    }
}

export const Unfollow = ({personid}) => async(dispatch) => {
    try {
        const result = await axios.post(`${utils.BACKEND_URL}/profile/unfollow`,{personid});
        dispatch(FollowInfo({personid}));
    } catch (error) {
      if(error.response){
          const errors = error.response.data.errors;

          if (errors) {
              errors.forEach((error) => dispatch(setAlert({msg:error.msg,alertType:'danger'})));
          }
      }
    }
}

export const removeFollower = ({personid}) => async(dispatch) => {
    try {
        const result = await axios.post(`${utils.BACKEND_URL}/profile/removefollower`,{personid});
        dispatch(FollowInfo({personid}));
    } catch (error) {
      if(error.response){
          const errors = error.response.data.errors;

          if (errors) {
              errors.forEach((error) => dispatch(setAlert({msg:error.msg,alertType:'danger'})));
          }
      }
    }
}
