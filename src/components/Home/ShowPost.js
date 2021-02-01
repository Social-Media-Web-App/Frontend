import React,{useEffect,useState} from 'react';
import {Card,InputGroup,Image,FormControl} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {FaThumbsUp} from 'react-icons/fa'
import userImg from '../../utils/user.png'
import Post from './Post'

import {showPost} from '../../actions/post'

const ShowPost = ({isAuthenticated,showPost,posts}) => {
    useEffect(() => {
        showPost();
    },[]);

    if(!isAuthenticated){
        return <Redirect to='/' />
      }
    return (
            <div className="container">
            { posts && posts.length > 0 ?
              posts.map((post,index) => {
                  return (
                   <Post index={index} post={post} />
                  )}):null
            }
            </div>
    );
}

const mapStateToProps = (state) => {
    return{
      isAuthenticated:state.auth.isAuthenticated,
      posts:state.post
    }
  }

export default connect(mapStateToProps,{showPost})(ShowPost);