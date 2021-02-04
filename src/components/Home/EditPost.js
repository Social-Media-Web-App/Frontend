import React,{useState,useEffect} from 'react';
import {InputGroup,Image,FormControl,Button,Modal,Alert} from 'react-bootstrap'
import {connect} from 'react-redux'
import {Redirect,Link} from 'react-router-dom'
import {editPost} from '../../actions/post'
import userImg from '../../utils/user.png'

const EditPost = (props) => {
    const {post,editPost,isAuthenticated,editpost} = props;
    const[postImage,setPostImage] = useState(null);
    const [postText,setPostText] = useState('');
    useEffect(() => {
      setPostText(post.text)
    },[post])
    if(!isAuthenticated){
      return <Redirect to='/' />
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {
          editpost?<Alert variant="success">{editpost}</Alert>:null
        }
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <InputGroup>
            <InputGroup.Prepend>
            <InputGroup.Text>Edit Post Text</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl value={postText} onChange={(event) => setPostText(event.target.value)} as="textarea" aria-label="With textarea" />
        </InputGroup>
          <hr/>
          <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Edit Post Image</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
                aria-label="Choose Profile Picture"
                aria-describedby="basic-addon2"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                style={{maxWidth:'15rem'}}
                className="btn btn-dark"
                onChange={(event) => {
                    setPostImage(event.target.files[0]);
                    event.target.value = null;
                }}
            />
          </InputGroup>
          <br/>
          {post.image?
            <Image className="col" style={{maxHeight:'14rem',maxWidth: '12rem'}} variant="top" src={postImage?URL.createObjectURL(postImage):post.image} />:null
           }
        </Modal.Body>
        <Modal.Footer>
          <Button  onClick={(event) => {
                if(postText !== '' || postImage !== null){
                    editPost({postid:post._id,postText,postImage});
                    setPostImage(null);
                }
                event.preventDefault();
            }} variant="primary">Edit Post</Button>
          <Button onClick={props.onHide} >Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const mapStateToProps = (state) => {
    return{
      isAuthenticated:state.auth.isAuthenticated,
      user:state.auth.user,
      editpost:state.editpost
    }
  }

export default connect(mapStateToProps,{editPost})(EditPost);
  