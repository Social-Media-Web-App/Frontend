import React,{useState,useEffect} from 'react';
import {ListGroup,Card,Image,Button,Accordion} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {getChatConnections} from '../../actions/chat'
import userImg from '../../utils/user.png'

import ChatBody from './ChatBody'

const Chat = ({isAuthenticated,getChatConnections,connections,user}) => {
    const [name,setName] = useState('');
    const [room,setRoom] = useState(null);
    /* console.log(connections); */
    useEffect(() => {
        getChatConnections();
        return () => {
            setName('');
            setRoom(null);
        }
    }, [])
    /* console.log(connections); */
    if(!isAuthenticated){
        return <Redirect to='/' />
      }
    return (
            <div style={{marginTop:'5%'}} className="container">
                <div className="row ">
                    <div className="col col-lg-5">
                    <ListGroup>
                        <Accordion defaultActiveKey="0">
                        <Accordion.Toggle className="btn-outline-primary mb-2" as={Card.Header} eventKey="0" style={{cursor:'pointer'}}>
                        Chat Connections
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <div className="mb-3">
                        {
                            connections ?
                            connections.map((connection,index) => {
                                return (
                                <ListGroup.Item  onClick={() => {
                                    setName(connection.connectionid.name);
                                    setRoom(connection.connectionroom);
                                }} style={{cursor:'pointer'}} className="btn-outline-success">
                                    <Image style={{width:'50px'}} src={connection.connectionid.avatar?connection.connectionid.avatar:userImg} />&nbsp;&nbsp;&nbsp;
                                    <b style={{textTransform:'capitalize'}}>{connection.connectionid.name}</b>
                                </ListGroup.Item>
                                )})
                                :null
                        }
                        </div>
                        </Accordion.Collapse>
                        </Accordion>
                    </ListGroup>
                    </div>
                    <div className="col d-flex justify-content-center">
                        {
                            (name !== '' && room !== null)?
                            <ChatBody name={name} room={room} />
                            :null
                        }
                    </div>
                </div> 
            </div>
    );
}

const mapStateToProps = (state) => {
    return{
      isAuthenticated:state.auth.isAuthenticated,
      connections:state.chat.connection,
      user : state.auth.user
    }
  }

export default connect(mapStateToProps,{getChatConnections})(Chat);