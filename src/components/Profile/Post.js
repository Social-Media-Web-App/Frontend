import React,{useState,useEffect} from 'react';
import {Card,InputGroup,Image,FormControl,Dropdown,DropdownButton} from 'react-bootstrap'
import {Redirect,Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {FaThumbsUp,FaThumbsDown} from 'react-icons/fa'
import userImg from '../../utils/user.png'
import msToTime from '../../utils/msToTime'

import {Dislike,Like} from '../../actions/post'
import {AddComment,deletePost} from '../../actions/post'
import {getProfile} from '../../actions/profile'
import Comment from './Comment';
import EditPost from './EditPost'


const Post = ({isAuthenticated,user,index,post,Like,Dislike,AddComment,personid,deletePost}) => {
    const [currTime,setCurrentTime] = useState(Date.now());
    const [like,setLike] = useState(false);
    const [dislike,setDislike] = useState(false);
    const [comment,setComment] = useState('');
    const [modalShow, setModalShow] = useState(false);
    useEffect(() => {
      if(user && post && post.likes && post.likes.find((personid) => personid === user._id)){
        setLike(true);
      }
      else
      setLike(false);

      if(user && post && post.dislikes && post.dislikes.find((personid) => personid === user._id)){
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
        <Link key={index} to={`/profile/${post.userid._id}`} style={{textDecoration:'none'}}>
        <Image className="bg-primary" rounded style={{width:'35px',height:'35px'}} src={post.userid.avatar?post.userid.avatar:userImg} />&nbsp;&nbsp;
        <b style={{textTransform:'capitalize',color:'white'}}>{post.userid.name}</b> 
        </Link>
        <b style={{marginLeft:'1.2rem',fontSize:'1rem',color:'lightgray'}}>
              ~&nbsp;
              {
                 msToTime(currTime - Date.parse(post.date))
              }
            </b>
            { user && (user._id === post.userid._id)?
                <DropdownButton
                style={{float:'right'}}
                    as={InputGroup.Prepend}
                    variant="outline-primary"
                    title={<b  style={{color:'white'}}>Post Settings</b>}
                    id="input-group-dropdown-1"
                  >
                    <Dropdown.Item onClick={() => setModalShow(true)} href="#">Edit</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => {
                      deletePost({postid:post._id})
                      window.location.reload();
                      }}>Delete</Dropdown.Item>
                  </DropdownButton>:null
              }
          </Card.Header>
          <EditPost
            show={modalShow}
            onHide={() => setModalShow(false)}
            post={post}
          />
        <Card.Body className="row">
         {post.image?
          <Image className="col" style={{maxHeight:'14rem',maxWidth: '12rem'}} variant="top" src={post.image} />:null
         }
          <Card.Text className="col" >
          {post.text}
          </Card.Text>
        </Card.Body>
        <InputGroup >
            <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1" 
            style={{backgroundColor:like?"lightgreen":'#E9ECEF',cursor:'pointer',pointerEvents:dislike?'none':'auto'}} 
            onClick={() =>  Like({like:!like,postid:post._id,personid})} >
              <FaThumbsUp  size={like?24:22} style={{color:like?'darkgreen':'yellowgreen'}} />
              <b >&nbsp;{post.likes.length}&nbsp;&nbsp;{post.likes.length>1?'likes':'like'}</b>
              </InputGroup.Text>
            </InputGroup.Prepend>
    
            <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1" 
            style={{backgroundColor:dislike?"pink":'#E9ECEF',cursor:'pointer',pointerEvents:like?'none':'auto'}} 
            onClick={() => Dislike({dislike:!dislike,postid:post._id,personid})} >
              <FaThumbsDown size={dislike?24:22} style={{color:dislike?'red':'pink'}} />
              <b>&nbsp;{post.dislikes.length}&nbsp;&nbsp;{post.dislikes.length>1?'dislikes':'dislike'}</b>
              </InputGroup.Text>
            </InputGroup.Prepend>
       
            <FormControl
            style={{minWidth:'70%'}}
            placeholder="Add a Comment..."
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            />
            <InputGroup.Append>
            <InputGroup.Text onClick={() => {
            AddComment({comment,postid:post._id,personid})
            setComment('')
          }} style={{color:'white',cursor:'pointer'}} className="bg-primary">Post</InputGroup.Text>
            </InputGroup.Append>
        </InputGroup>   
        <hr style={{marginBottom:'0',marginTop:'0.5rem'}} />
       <Comment personid={personid} postid={post._id} comments={post.comments} />
      </Card>
    );
}

const mapStateToProps = (state) => {
    return{
      isAuthenticated:state.auth.isAuthenticated,
      user:state.auth.user
    }
  }

export default connect(mapStateToProps,{Like,Dislike,AddComment,deletePost})(Post);