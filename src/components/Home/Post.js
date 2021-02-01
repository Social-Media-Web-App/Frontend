import React,{useState,useEffect} from 'react';
import {Card,InputGroup,Image,FormControl} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {FaThumbsUp,FaThumbsDown} from 'react-icons/fa'
import userImg from '../../utils/user.png'

import {Dislike,Like} from '../../actions/post'

const Post = ({isAuthenticated,user,index,post,Like,Dislike}) => {
    const [currTime,setCurrentTime] = useState(Date.now());
    const [like,setLike] = useState(false);
    const [dislike,setDislike] = useState(false);
    const [comment,setComment] = useState('');
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

      /* useEffect(() => {
        Like({like,postid:post._id});
      },[like])

      useEffect(() => {
        Dislike({dislike,postid:post._id});
      },[dislike]); */

      const msToTime = (s) =>  {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;
      
        if(hrs > 24){
          if(hrs/24 > 1)
          return hrs/24 + ' days ago';
          else
          return hrs/24 + ' day ago'
        }
        else if(hrs < 24 && hrs > 0){
          if(hrs > 1)
          return hrs + ' hours ago';
          else
          return hrs + ' hour ago'
        }
        else if(mins  > 0){
          if(mins > 1)
          return mins + ' minutes ago';
          else
          return mins + ' minute ago'
        }
        else if(secs  > 0){
          if(secs > 1)
          return secs + ' seconds ago';
          else
          return secs + ' second ago'
        }
        else return null;
        /* return hrs + ':' + mins + ':' + secs + '.' + ms; */
      }
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
              <FaThumbsUp  size={like?27:23} style={{color:like?'darkgreen':'yellowgreen'}} />
              <b >&nbsp;{post.likes.length}&nbsp; likes</b>
              </InputGroup.Text>
            </InputGroup.Prepend>
          }
          {
            like?null:
            <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1" style={{cursor:'pointer'}} onClick={() => Dislike({dislike:!dislike,postid:post._id})} >
              <FaThumbsDown size={dislike?27:23} style={{color:dislike?'red':'pink'}} />
              <b>&nbsp;{post.dislikes.length}&nbsp; dislikes</b>
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
            <InputGroup.Text style={{color:'white',cursor:'pointer'}} className="bg-primary">Post</InputGroup.Text>
            </InputGroup.Append>
        </InputGroup>   
      </Card>
    );
}

const mapStateToProps = (state) => {
    return{
      isAuthenticated:state.auth.isAuthenticated,
      user:state.auth.user
    }
  }

export default connect(mapStateToProps,{Like,Dislike})(Post);