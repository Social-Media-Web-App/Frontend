import React,{useState,useEffect} from 'react';
import {Card,Button,InputGroup,FormControl,Form} from 'react-bootstrap'
import {RiEyeLine} from 'react-icons/ri'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import userImg from '../../utils/user.png'
import {uploadImage} from '../../actions/update'

const Settings = ({user,isAuthenticated,uploadImage}) => {
    const [name,setName] = useState('');
    const [image,setImage] = useState(null);
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [editName,setEditName] = useState(true);
    const [editPassword,setEditPassword] = useState(true);
    const [showPassword,setShowPassword] = useState(false);
    const [showPassword2,setShowPassword2] = useState(false);

    let history = useHistory();
    if(!isAuthenticated){
        history.push('/')
    }
    useEffect(() => {
           if(isAuthenticated){
            setName(user.name);
            setEmail(user.email);
           }
    },[user])
   
    return (
        <Card className="mt-4">
            <Card.Header as="h5">Profile Settings</Card.Header>
            <Card.Body>
            <Form  enctype="multipart/form-data">
                <center>
                <Card className="mb-2 border border-dark d-flex align-items-center">
                    <Card.Img className="rounded" style={{marginTop:'1rem',maxHeight:'12rem',maxWidth: '10rem'}} variant="top" src={image?URL.createObjectURL(image):(user.avatar?user.avatar:userImg)} thumbnail fluid />
                    <Card.Body className="container">
                        <Card.Title>Profile Image</Card.Title>
                        <InputGroup className="mb-2 row">
                                <FormControl
                                aria-label="Choose Profile Picture"
                                aria-describedby="basic-addon2"
                                type="file"
                                style={{marginRight:'3rem',marginLeft:'3rem',marginTop:'0.2rem'}}
                                className="btn btn-primary col-sm"
                                onChange={(event) => setImage(event.target.files[0])}
                                />
                                <Button style={{marginRight:'3rem',marginLeft:'3rem',marginTop:'0.2rem'}}
                                className="btn btn-primary col-sm"
                                onClick={() => uploadImage(image)}>Upload Image</Button>
                        </InputGroup>
                    </Card.Body>
                </Card>
                </center>
                </Form>
            <Form >
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={name}
                disabled={editName}
                />
                <InputGroup.Append>
                <InputGroup.Text onClick={() => setEditName(!editName)}  id="basic-addon2">Edit Name</InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>
                
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={email}
                disabled
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">New Password</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                disabled={editPassword}
                type={showPassword?'text':'password'}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                placeholder="Enter New Password."
                />
                <InputGroup.Append>
                <InputGroup.Text id="basic-addon2" onClick={() => setShowPassword(!showPassword)}  ><RiEyeLine/></InputGroup.Text>
                </InputGroup.Append>
                <InputGroup.Append>
                <InputGroup.Text onClick={() => setEditPassword(!editPassword)} id="basic-addon2">Edit Password</InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Current Password</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                type={showPassword2?'text':'password'}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                placeholder="Enter Current Password to Proceed."
                />
                <InputGroup.Append>
                <InputGroup.Text id="basic-addon2" onClick={() => setShowPassword2(!showPassword2)}  ><RiEyeLine/></InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>
                <Button variant="primary">Submit</Button>
            </Form>
            </Card.Body>
        </Card>
    );
}

const mapStateToProps = (state) => {
    return {
        user:state.auth.user,
        isAuthenticated:state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps,{uploadImage})(Settings);