import React from 'react';
import {Jumbotron,Button,Alert} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import ScrollToBottom from 'react-scroll-to-bottom';

const Message = ({isAuthenticated,messages,user}) => {
    const username = user.name;
    if(!isAuthenticated){
        return <Redirect to='/' />
      }
    return (
            
            <div className="container" style={{height:'15rem',overflowX:'hidden'}}>
                <div className="col">
                <ScrollToBottom /* style={{height:'70vh'}} */>
              {
                (messages && messages.length>0)?
                    messages.map((msg,index) => {
                        return (
                    <Alert className="row"  style={{width:"60%",float:msg.user === 'admin'?'none':username === msg.user?'right':'left',margin:'5px'}} variant={msg.user === 'admin'?'dark':username === msg.user?"primary":"danger"} >
                        <div>
                        <b style={{textTransform:'capitalize'}}>{msg.user}</b>
                        <p style={{width:'95%'}}>{msg.text}</p>
                        </div>
                    <br/>
                    </Alert>
                    )})
                    :null
                }
            </ScrollToBottom>
            </div>
                </div>
    );
}

const mapStateToProps = (state) => {
    return{
      isAuthenticated:state.auth.isAuthenticated,
      user:state.auth.user
    }
  }

export default connect(mapStateToProps,{})(Message);