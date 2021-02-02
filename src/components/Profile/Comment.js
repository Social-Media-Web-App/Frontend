import React,{useState,useEffect} from 'react';
import {Button,Alert,Image} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import userImg from '../../utils/user.png'
import msToTime from '../../utils/msToTime'

const Comment = ({isAuthenticated,comments}) => {
    const [showComment,setShowComment] = useState(false);
    const [currTime,setCurrentTime] = useState(Date.now());
    useEffect(() => {
        setInterval(() => setCurrentTime(Date.now()),100000);
      },[currTime])
    if(!isAuthenticated){
        return <Redirect to='/' />
      }
    return (
            <div>
               <Alert style={{marginBottom:'0',cursor:'pointer',textAlign:'center',fontWeight:'bold'}} onClick={() => setShowComment(!showComment)} variant={showComment?"danger":"success"}>
                         {comments.length}{showComment?' Comments':' Comments'}
                   </Alert>
               {
                   showComment ?
                   comments && comments.length > 0 ?
                   comments.map((comment,index) => {
                       return (
                        <Alert key={index} variant="info" style={{marginBottom:'0',marginTop:'0.3rem',marginLeft:'0.1rem',marginRight:'0.1rem'}}>
                            <div className="container">
                            <Image className="bg-primary" rounded style={{width:'35px',height:'35px'}} src={comment.userid && comment.userid.avatar?comment.userid.avatar:userImg} />&nbsp;&nbsp;
                                <b style={{textTransform:'capitalize'}}>{comment.userid && comment.userid.name}</b>
                                    <b style={{float:'right'}}>
                                    ~&nbsp;
                                    {
                                        msToTime(currTime - Date.parse(comment.date))
                                    }
                                    </b>
                                    <hr style={{marginTop:'0.3rem',marginBottom:'0.3rem',border:'0.6px solid #47D1CC'}} />
                                    <div style={{/* textAlign:'center' */}} >
                                        {comment.body}
                                    </div>
                            </div>
                        </Alert>
                       )}):<center><b>" No comments to show "</b></center>:null
                }
            </div>
    );
}

const mapStateToProps = (state) => {
    return{
      isAuthenticated:state.auth.isAuthenticated
    }
  }

export default connect(mapStateToProps,{})(Comment);