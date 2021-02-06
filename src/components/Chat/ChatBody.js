import React,{useState,useEffect} from 'react';
import {ListGroup,Card,Image,Button,InputGroup,FormControl} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import io from 'socket.io-client';
import Message from './Message'

import {saveMessage,getMessage} from '../../actions/chat'

let socket;
var connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
};

const ChatBody = ({isAuthenticated,name,room,saveMessage,getMessage,chats,user}) => {
    const[message,setMessage] = useState(null);
    const[messages,setMessages] = useState([]);

    /// chat configs

    const ENDPOINT = 'https://getsociofy.herokuapp.com/';
    /* console.log(chats); */
    useEffect(() => {
        getMessage({room});
    },[])

    useEffect(() => {
        if(chats.length > 0){
            setMessages(chats);
        }
    },[chats])

    useEffect(() => {
        socket = io.connect(ENDPOINT,connectionOptions);
        console.log("reached connect");
        socket.emit('join',{name:user.name,room},() => {

        });
        return () => {
            socket.emit('disconnection');
            socket.off();
        }
    },[]);

    useEffect(() => {
        socket.on('message',(message) => {
            setMessages([...messages,message]);
        })
    },[messages])

    /* useEffect(() => {
        socket.on('roomData',({users}) => {
            console.log("users:",users);
            setUsers(users);
        })
    },[users]);; */

    const sendMessage = (event) => {
        event.preventDefault();
        if(message){
            socket.emit('sendMessage',message,() => setMessage(''));
            saveMessage({name:user.name,room,text:message});
        }
    }

  /*   console.log(messages); */

    /// chat congigs

    if(!isAuthenticated){
        return <Redirect to='/' />
      }
    return (
            <div>
               <Card className="mb-5" style={{ width: '80vh',border:'0.7px solid lightblue' }}>
                {
                    name && room?
                        <Card.Body>
                            <Card.Title style={{textTransform:'capitalize'}}>{name}</Card.Title>
                            {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                            <hr/>
                            <Card.Text>
                               <Message messages={messages} />
                            </Card.Text>   
                            <hr/>
                            <InputGroup className="mb-1">
                                <FormControl
                                placeholder="Type your Message"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                                />
                                <InputGroup.Append>
                                <InputGroup.Text onClick={(event) => sendMessage(event)} style={{cursor:'pointer'}} className="btn-outline-primary" id="basic-addon2">Send</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Card.Body>
                        :null
                    }
                    </Card>
                 </div>
    );
}

const mapStateToProps = (state) => {
    return{
      isAuthenticated:state.auth.isAuthenticated,
      user:state.auth.user,
      chats:state.chat.chats
    }
  }

export default connect(mapStateToProps,{saveMessage,getMessage})(ChatBody);