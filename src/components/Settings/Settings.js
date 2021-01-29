import React,{useState} from 'react';
import {Card,Button,InputGroup,FormControl} from 'react-bootstrap'
import {RiEyeLine} from 'react-icons/ri'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

const Settings = ({user,isAuthenticated}) => {
    const [name,setName] = useState(user.name);
    const [password,setPassword] = useState(user.name);
    const [email,setEmail] = useState(user.email);
    const [editName,setEditName] = useState(true);
    const [editPassword,setEditPassword] = useState(true);
    const [showPassword,setShowPassword] = useState(false);
    const [showPassword2,setShowPassword2] = useState(false);
    
    return (
        <Card className="mt-4">
            <Card.Header as="h5">Profile Settings</Card.Header>
            <Card.Body>
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

export default connect(mapStateToProps,{})(Settings);