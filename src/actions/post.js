import axios from 'axios'
import {setAlert} from './alert'
import {setLoader,removeLoader} from './loader'
import utils from '../utils/utils.json';
import {loadUser} from './auth'
import {getProfile} from './profile'

export const addPost = ({postText,postImage}) => async(dispatch) => {
    dispatch(setLoader());
    const formData = new FormData();
    if(postText !== ''){
        /* console.log("reached add post text"); */
        formData.append(
            "text",
            postText
          );
    }
    if(postImage !== null){
       /*  console.log("reached add post iage"); */
        formData.append(
            "image",
            postImage,
            postImage.name
          );
    }
    try {
        const uploadRes = await axios.post(`${utils.BACKEND_URL}/post`,formData);
        dispatch(removeLoader());
        dispatch(showPost());
        dispatch(loadUser('/home'));
        dispatch(setAlert({msg:uploadRes.data, alertType:'success'}));
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

export const showPost = () => async(dispatch) => {
    dispatch(setLoader());
    try {
        const posts = await axios.get(`${utils.BACKEND_URL}/post`);
        await posts.data.map((post) => post.comments.reverse())
        /* console.log(posts); */
        dispatch(removeLoader());
        dispatch({
            type:'Show_Post',
            payload:posts.data
        });
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

export const Like = ({like,postid,personid}) => async(dispatch) => {
   /*  console.log( "action:",like,postid); */
        try {
            const res = await axios.post(`${utils.BACKEND_URL}/post/like`,{like:like,postid:postid});
            /* console.log(res.data); */
            dispatch(showPost());
            if(personid){
                dispatch(getProfile({personid}));
            }
        } catch (error) {
            if(error.response){
                const errors = error.response.data.errors;
        
                if (errors) {
                    errors.forEach((error) => dispatch(setAlert({msg:error.msg,alertType:'danger'})));
                }
            }
        }
}

export const Dislike = ({dislike,postid,personid}) => async(dispatch) => {
        try {
            const res = await axios.post(`${utils.BACKEND_URL}/post/dislike`,{dislike:dislike,postid:postid});
           /*  console.log(res.data); */
            dispatch(showPost());
            if(personid){
                dispatch(getProfile({personid}));
            }
        } catch (error) {
            if(error.response){
                const errors = error.response.data.errors;
        
                if (errors) {
                    errors.forEach((error) => dispatch(setAlert({msg:error.msg,alertType:'danger'})));
                }
            }
        }
}

export const AddComment = ({comment,postid,personid}) => async(dispatch) => {
  /*   console.log({comment,postid}); */
    try {
          const res = await axios.post(`${utils.BACKEND_URL}/post/addcomment`,{comment:comment,postid:postid});
          /* console.log(res.data); */
          dispatch(showPost());
          if(personid){
            dispatch(getProfile({personid}));
        }
    } catch (error) {
        if(error.response){
            const errors = error.response.data.errors;
    
            if (errors) {
                errors.forEach((error) => dispatch(setAlert({msg:error.msg,alertType:'danger'})));
            }
        }
    }
}