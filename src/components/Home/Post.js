import React,{useState,useEffect} from 'react';
import {Card,InputGroup,Image,FormControl,Alert} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {FaThumbsUp,FaThumbsDown} from 'react-icons/fa'
import userImg from '../../utils/user.png'
import msToTime from '../../utils/msToTime'

import {Dislike,Like} from '../../actions/post'
import {AddComment} from '../../actions/post'
import Comment from './Comment';

const Post = ({isAuthenticated,user,index,post,Like,Dislike,AddComment}) => {
    const [currTime,setCurrentTime] = useState(Date.now());
    const [like,setLike] = useState(false);
    const [dislike,setDislike] = useState(false);
    const [comment,setComment] = useState('');
    /* useEffect(() => {
      post.comments.reverse();
    },[]) */
    useEffect(() => {
      if(post.likes.find((id) => id === user._id)){
        setLike(true);
      }
      else
      setLike(false);

      if(post.dislikes.find((id) => id === user._id)){
        setDislike(true);
      }
      else
      setDislike(false);

    },[post])
    useEffect(() => {
        setInterval(() => setCurrentTime(Date.now()),100000);
      },[currTime])

    if(!isAuthenticated){
        return <Redirect to='/' />
      }
    return (
        <Card key={index} className="mb-5" style={{border:'2px solid blue'}}>
        <Card.Header style={{color:"white",fontWeight:'bold',backgroundColor:'navy'}} className="" as="h5">
        <Image className="bg-primary" rounded style={{width:'35px',height:'35px'}} src={post.userid.avatar?post.userid.avatar:userImg} />&nbsp;&nbsp;
          {post.userid.name}
            <b style={{float:'right'}}>
              ~&nbsp;
              {
                 msToTime(currTime - Date.parse(post.date))
              }
            </b>
          </Card.Header>
        <Card.Body className="row">
         {post.image?
          <Image className="col" style={{maxHeight:'14rem',maxWidth: '12rem'}} variant="top" src={post.image} />:null
         }
          <Card.Text className="col" >
          {post.text}
          </Card.Text>
        </Card.Body>
        <InputGroup >
          {
            dislike?null:
            <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1" style={{cursor:'pointer'}} onClick={() =>  Like({like:!like,postid:post._id})} >
              <FaThumbsUp  size={like?24:22} style={{color:like?'darkgreen':'yellowgreen'}} />
              <b >&nbsp;{post.likes.length}&nbsp;&nbsp;{post.likes.length>1?'likes':'like'}</b>
              </InputGroup.Text>
            </InputGroup.Prepend>
          }
          {
            like?null:
            <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1" style={{cursor:'pointer'}} onClick={() => Dislike({dislike:!dislike,postid:post._id})} >
              <FaThumbsDown size={dislike?24:22} style={{color:dislike?'red':'pink'}} />
              <b>&nbsp;{post.dislikes.length}&nbsp;&nbsp;{post.dislikes.length>1?'dislikes':'dislike'}</b>
              </InputGroup.Text>
            </InputGroup.Prepend>
          }
            <FormControl
            style={{minWidth:like||dislike?'80%':'70%'}}
            placeholder="Add a Comment..."
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            />
            <InputGroup.Append>
            <InputGroup.Text onClick={() => {
            AddComment({comment,postid:post._id})
            setComment('')
          }} style={{color:'white',cursor:'pointer'}} className="bg-primary">Post</InputGroup.Text>
            </InputGroup.Append>
        </InputGroup>   
        <hr style={{marginBottom:'0',marginTop:'0.5rem'}} />
       <Comment comments={post.comments} />
      </Card>
    );
}

const mapStateToProps = (state) => {
    return{
      isAuthenticated:state.auth.isAuthenticated,
      user:state.auth.user
    }
  }

export default connect(mapStateToProps,{Like,Dislike,AddComment})(Post);