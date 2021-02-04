import React,{useState,useEffect} from 'react';
import {Card,InputGroup,Alert,Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import userImg from '../../utils/user.png'
import msToTime from '../../utils/msToTime'

import {getProfile,Follow,Unfollow} from '../../actions/profile'
import Post from './Post'

const Profile = ({isAuthenticated,match,getProfile,profile,user,followinfo,Follow,Unfollow,removeFollower}) => {
    const [currTime,setCurrentTime] = useState(Date.now());
    const [isFollower,setIsFollower] = useState(false);
    const [isFollowed,setIsFollowed] = useState(false);

    const {personid} = match.params;
    useEffect(() => {
        getProfile({personid});
    }, [personid]);

    useEffect(() => {
       if(followinfo){
           setIsFollower(followinfo.isfollower);
           setIsFollowed(followinfo.isfollowed);
       }
    },[followinfo])

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
                        <InputGroup className="mb-2 mt-3 row justify-content-center">
                        {
                        !followinfo || profile._id === user._id?null:
                        <div>
                            {
                            isFollowed?
                            <Button className="btn btn-danger" onClick={() => Unfollow({personid})} style={{marginRight:'1rem'}} /* className="col col-lg-2" */>Unfollow</Button>:
                            <Button className="btn btn-primary" onClick={() => Follow({personid})} style={{marginRight:'1rem'}} /* className="col col-lg-2" */>Follow</Button>
                            }
                            {
                            isFollower?
                            <Button onClick={() => removeFollower({personid})} className="btn btn-success" style={{marginLeft:'1rem'}} /* className="col col-lg-2" */>Remove this Follower</Button>
                            :<Button className="btn btn-dark" style={{marginLeft:'1rem'}} /* className="col col-lg-2" */>Not Follows you</Button>
                            }
                        </div>
                        }
                        </InputGroup>
                        </Card.Body>
                    </Card>
                    </center>
                    </Card.Body>
                    {
                        profile.posts && isFollowed ?
                        profile.posts.map((post,index) => {
                            return (
                                <Post index={index} personid={personid} post={post} />
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
        user:state.auth.user,
        profile:state.person.profile,
        followinfo:state.person.followinfo
        }
    }

    export default connect(mapStateToProps,{getProfile,Follow,Unfollow})(Profile);