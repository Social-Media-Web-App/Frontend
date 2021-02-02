import React,{useState,useEffect} from 'react';
import {Card,InputGroup,Alert,Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import userImg from '../../utils/user.png'
import msToTime from '../../utils/msToTime'

import {getProfile} from '../../actions/profile'
import Post from './Post'

const Profile = ({isAuthenticated,match,getProfile,profile}) => {
    const [currTime,setCurrentTime] = useState(Date.now());
    console.log(profile);
    const {id} = match.params;
    useEffect(() => {
        getProfile({id});
    }, [id])
    if(!isAuthenticated){
        return <Redirect to='/' />
      }
    return (
            <div>
                {
                profile?
                <Card className="mt-4">
                    <Alert style={{textAlign:'center',fontSize:'1.3rem',fontWeight:'bold'}} variant="primary">Profile</Alert>
                    <Card.Body>
                    <center>
                        <Card className="mb-2 border border-dark d-flex align-items-center">
                            <Card.Img className="rounded" style={{marginTop:'1rem',maxHeight:'12rem',maxWidth: '10rem'}} variant="top" src={profile.avatar?profile.avatar:userImg} thumbnail fluid />
                            <Card.Body className="container">
                                <Card.Title style={{textTransform:'capitalize'}}>{profile.name}</Card.Title>
                                <Card.Title>{profile.email}</Card.Title>
                                <b>( Joined {msToTime(currTime - Date.parse(profile.date))} )</b>
                                <InputGroup className="mb-2 mt-3 row justify-content-md-center">
                                    <Button style={{marginRight:'1rem'}} className="col col-lg-2">Follow</Button>
                                    <Button  style={{marginLeft:'1rem'}} className="col col-lg-2">Unfollow</Button>
                                </InputGroup>
                            </Card.Body>
                        </Card>
                    </center>
                    </Card.Body>
                    {
                        profile.posts ?
                        profile.posts.map((post,index) => {
                            return (
                                <Post index={index} id={id} post={post} />
                            )
                        }):null
                    }
                </Card>:null
                }
            </div>
    );
}

const mapStateToProps = (state) => {
    return{
      isAuthenticated:state.auth.isAuthenticated,
      profile:state.profile
    }
  }

export default connect(mapStateToProps,{getProfile})(Profile);