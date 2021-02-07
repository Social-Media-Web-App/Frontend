import axios from 'axios'
import {setAlert} from './alert'
import {setLoader,removeLoader} from './loader'
import utils from '../utils/utils.json';
import {loadUser} from './auth'
import {getProfile} from './profile'

export const addPost = ({postText,postImage}) => async(dispatch) => {
    dispatch(setLoader()); 
    var imageUrl = null;
    try {
        if(postImage !== null){
            const formData = new FormData();
            formData.append("file",postImage);
            formData.append('upload_preset', 'tfxiqkad');
            delete axios.defaults.headers.common['x-auth-token'];
            const uploadRes = await axios.post(utils.IMAGE_UPLOAD_URL,formData);
            axios.defaults.headers.common['x-auth-token'] = localStorage.token;
            imageUrl = uploadRes.data.secure_url;
        }
        const savePost = await axios.post(`${utils.BACKEND_URL}/post`,{imageUrl,text:postText});
        dispatch(removeLoader());
        dispatch(showPost());
        dispatch(loadUser('/home'));
        dispatch(setAlert({msg:savePost.data, alertType:'success'}));
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

export const editPost = ({postid,postText,postImage,route}) => async(dispatch) => {
    dispatch(setLoader());
    var imageUrl = null;
    var text = null;
    if(postText !== '' && postText !== null){
        text = postText
    }
    try {
        if(postImage !== null){
            const formData = new FormData();
            formData.append("file",postImage);
            formData.append('upload_preset', 'tfxiqkad');
            delete axios.defaults.headers.common['x-auth-token'];
            const uploadRes = await axios.post(utils.IMAGE_UPLOAD_URL,formData);
            axios.defaults.headers.common['x-auth-token'] = localStorage.token;
            imageUrl = uploadRes.data.secure_url;
        }
        const uploadRes = await axios.post(`${utils.BACKEND_URL}/post/edit`,{imageUrl,text,postid});
        dispatch(removeLoader());
        dispatch(showPost());
        dispatch(loadUser(`/home`));
        dispatch({type:'Edit_Post_Alert',payload:uploadRes.data});
        setTimeout(() =>  dispatch({type:'Edit_Post_Remove_Alert'}),2000)
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

export const deletePost = ({postid}) => async(dispatch) => {
    dispatch(setLoader());
    try {
        const deleted = await axios.post(`${utils.BACKEND_URL}/post/delete`,{postid});
        /* console.log(posts); */
        dispatch(showPost());
        dispatch(removeLoader());
        dispatch(setAlert({msg:deleted.data,alertType:'success'}));
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

export const deleteComment = ({postid,commentid,personid}) => async(dispatch) => {
    dispatch(setLoader());
    try {
        const deleted = await axios.post(`${utils.BACKEND_URL}/post/deletecomment`,{postid,commentid});
        /* console.log(posts); */
        dispatch(showPost());
        if(personid){
            dispatch(getProfile({personid}));
        }
        dispatch(removeLoader());
       /*  dispatch(setAlert({msg:deleted.data,alertType:'success'})); */
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