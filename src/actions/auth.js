import axios from 'axios'
import {setAlert} from './alert'
import {setLoader,removeLoader} from './loader'
import setAuthToken from '../utils/setAuthToken';
import utils from '../utils/utils.json';
import {Navigate} from '../utils/Navigate';

export const loadUser = (route) => async(dispatch) => {
        if(localStorage.token){
        setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get(`${utils.BACKEND_URL}/auth`);
            dispatch({
                type:'Auth_Success',
                payload : res
            });
            Navigate(route);
        } catch (error) {
            console.log(error);
            Navigate('/');
            removeLoader();
            if(error.response){
                const errors = error.response.data.errors;

                if (errors) {
                    errors.forEach((error) => dispatch(setAlert({msg:error.msg,alertType:'danger'})));
                }
            }
            dispatch({
                type:'Auth_Fail'
            });
        }
}

export const register = ({name,email,password}) => async(dispatch) => {
    setLoader();
    const config = {
		headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
    };
    const body = JSON.stringify({name,email,password});
    try {
        const res = await axios.post(`${utils.BACKEND_URL}/users`,body,config);
        dispatch({
            type:'Register_Success',
            payload:res.data
        });
        dispatch(loadUser('/home'));
    } catch (err) {
        console.log(err);
        removeLoader();
        if(err.response){
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => dispatch(setAlert({msg:error.msg,alertType:'danger'})));
            }
        }
        dispatch({
            type:'Register_Fail'
        });
    }
}

export const login = ({email,password}) => async(dispatch) => {
    setLoader();
    const config = {
		headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
    };
    const body = JSON.stringify({email,password});
    try {
        const res = await axios.post(`${utils.BACKEND_URL}/auth`,body,config);
        dispatch({
            type:'Login_Success',
            payload:res.data
        });
        dispatch(loadUser('/home'));
    } catch (error) {
        console.log(error);
        removeLoader();
        if(error.response){
            const errors = error.response.data.errors;

            if (errors) {
                errors.forEach((error) => dispatch(setAlert({msg:error.msg,alertType:'danger'})));
            }
        }
        dispatch({
            type:'Login_Fail'
        });
    }
}

export const logout = (history) => async(dispatch) => {
    dispatch({
        type:'Logout'
    });
    history.push('/');
    dispatch(setAlert({msg:"Logged Out Successfully",alertType:'success'}));
}