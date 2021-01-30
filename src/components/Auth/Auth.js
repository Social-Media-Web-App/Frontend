import React from 'react';
import {Tabs,Tab,Spinner} from 'react-bootstrap'
import AuthForm from './AuthForm'
import {connect} from 'react-redux'
import './Auth.css'
import {register,login} from '../../actions/auth'
import {setAlert} from '../../actions/alert'
import {useHistory} from 'react-router-dom'

const Auth = ({setAlert,register,login,isAuthenticated}) => {
    const onsubmit = (type,name,email,password,image) => {
          if(type === 'register'){
                if(name === '' || email === '' || password === '' ){
                    setAlert({msg:'All fields are Necessary.',alertType:'danger'});
                }
                else{
                    register({name,email,password,image})
                }
           }
           else if(type === 'login'){
                if(email === '' || password === '' ){
                    setAlert({msg:'All fields are Necessary.',alertType:'danger'});
                }
                else{
                    login({email,password})
                }
           }
    } 

    let history = useHistory();
    if(isAuthenticated){
        history.push('/home');
      }
    
    return (
            <center className="outer">
            <div className="inner">
            <Tabs defaultActiveKey="login" className="tab" id="uncontrolled-tab-example">
                <Tab eventKey="login" title="Login">
                     <AuthForm type="login" onsubmit={onsubmit} />
                </Tab>
                <Tab eventKey="register" title="Register">
                     <AuthForm type="register" onsubmit={onsubmit} />
                </Tab>
            </Tabs>
            </div>
            </center>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated:state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps,{register,login,setAlert})(Auth);