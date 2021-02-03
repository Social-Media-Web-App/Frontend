import React,{useState} from 'react';
import {Button,InputGroup,FormControl,Card,Form} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {addPost} from '../../actions/post'

const AddPost = ({isAuthenticated,addPost}) => {
    const [postText,setPostText] = useState('');
    const [postImage,setPostImage] = useState(null);

    if(!isAuthenticated){
        return <Redirect to='/' />
      }
    return (
         <Card className="border border-dark" >
            <Card.Header style={{backgroundColor:'blue',color:'white',fontWeight:'bold'}} className="border-bottom border-dark" as="h5">Post your Thoughts and Images</Card.Header>
            <Form encType="multipart/form-data">
            <Card.Body>
                <Card.Title>Say Something</Card.Title>
                <Card.Text>
                <InputGroup>
                    <InputGroup.Prepend>
                    <InputGroup.Text>...</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl as="textarea" aria-label="With textarea" 
                         onChange={(event) => setPostText(event.target.value)}
                         value={postText}
                    />
                </InputGroup>
                </Card.Text>

                <Card.Title>Add an Image</Card.Title>
                <Card.Text>
                <InputGroup>
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
                {postImage?<Card.Img className="rounded" style={{marginTop:'1rem',maxHeight:'12rem',maxWidth: '10rem'}} variant="top" src={postImage?URL.createObjectURL(postImage):null} thumbnail fluid />:null}
                </Card.Text>
            <Button onClick={(event) => {
                if(postText !== '' || postImage !== null){
                    addPost({postText,postImage});
                    setPostImage(null);
                    setPostText('');
                }
                event.preventDefault();
            }} variant="primary">Add Post</Button>
            </Card.Body>
            </Form>
        </Card>
           
    );
}

const mapStateToProps = (state) => {
    return{
      isAuthenticated:state.auth.isAuthenticated
    }
  }

export default connect(mapStateToProps,{addPost})(AddPost);