import React, { useState,useEffect } from 'react';
import {Tabs,Tab,Button,Card} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import {getConnections} from '../../actions/connection'
import Person from './Person'

const Connection = ({isAuthenticated,connection,getConnections,user}) => {
    const [tab,setTab] = useState(1);
    useEffect(() => {
        getConnections();
    }, [])
    if(!isAuthenticated){
        return <Redirect to='/' />
      }
    return (
            <div className="container">
                <center>
                <Card className="mt-3">
                    <Card.Header className="row ">
                    <Button onClick={() => setTab(1)} className="col" style={{marginRight:'1rem',fontWeight:'bold'}} variant={tab === 1?"primary":"outline-primary"}>Followers</Button>
                    <Button onClick={() => setTab(2)}  className="col" style={{marginLeft:'1rem',fontWeight:'bold'}} variant={tab === 2?"primary":"outline-primary"}>Following</Button>
                    </Card.Header>
                    <Card.Body>
                    {
                        connection ?
                         tab === 1?
                        connection.followers.map((follower,index) => {
                            return <Person person={follower} index={index} />
                        }):
                        connection.following.map((followed,index) => {                            
                            return (followed._id !== user._id)?
                            <Person person={followed} index={index} />:null
                        })
                        :null
                    }
                    </Card.Body>
                    </Card>
             </center>
             </div>
    );
}

const mapStateToProps = (state) => {
    return{
      isAuthenticated:state.auth.isAuthenticated,
      connection : state.connection,
      user : state.auth.user
    }
  }

export default connect(mapStateToProps,{getConnections})(Connection);