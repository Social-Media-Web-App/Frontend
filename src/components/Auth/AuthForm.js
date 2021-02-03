import React,{useState} from 'react';
import {Form,Button,InputGroup,FormControl,Card} from 'react-bootstrap'
import {BiText} from 'react-icons/bi';
import {RiLockPasswordLine,RiEyeLine} from 'react-icons/ri'

const AuthForm = ({type,onsubmit}) => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState(''); 
    const [password,setPassword] = useState(''); 
    const [passwordType,setPasswordType] = useState(1);

    return (
        <div className="d-flex justify-content-center">
            <Form className="form"> 
            {
                type === 'register'?
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1"><BiText/></InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control style={{textTransform:'capitalize'}} required="true" type="text" placeholder="Enter Name" value={name} onChange={(event) => setName(event.target.value)} />
                </InputGroup>:null
            } 
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    </InputGroup.Prepend>
                <Form.Control style={{textTransform:'lowercase'}} required="true" type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1"><RiLockPasswordLine/></InputGroup.Text>
                    </InputGroup.Prepend>
                <Form.Control required="true" type={passwordType?'password':'text'} placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                <InputGroup.Append>
                <InputGroup.Text onClick={() => setPasswordType(!passwordType)}><RiEyeLine/></InputGroup.Text>
                </InputGroup.Append>
                </InputGroup>
                
                <Button onClick={(e) => {
                    e.preventDefault();
                    onsubmit(type,name,email,password)
                }} variant="primary" type="submit">
                  Submit
                </Button>
            </Form>
        </div>
    );
}

export default AuthForm;