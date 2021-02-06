import axios from 'axios'
import {setAlert} from './alert'
import {setLoader,removeLoader} from './loader'
import setAuthToken from '../utils/setAuthToken';
import utils from '../utils/utils.json';
import {Navigate} from '../utils/Navigate';

export const getChatConnections = () => async(dispatch) => {
    dispatch(setLoader());
    try {
        const result = await axios.get(`${utils.BACKEND_URL}/chat`);
     /*    console.log("result :",result.data); */
        dispatch({type:'Set_Chat_Connections',payload:result.data});
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

export const saveMessage = ({name,room,text}) => async(dispatch) => {
    try {
        const result = await axios.post(`${utils.BACKEND_URL}/chat`,{name,room,text});
       /*  console.log("message saved",result.data); */
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


export const getMessage = ({room}) => async(dispatch) => {
    try {
        const result = await axios.post(`${utils.BACKEND_URL}/chat/getmessage`,{room});
      /*   console.log("messages :",result.data.body); */
        dispatch({type:'Set_Chats',payload:result.data.body});
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