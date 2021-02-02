import React from 'react';
import {Image,Alert} from 'react-bootstrap'
import {Redirect,Link} from 'react-router-dom'
import {connect} from 'react-redux'
import userImg from '../../utils/user.png'


const Person = ({isAuthenticated,person,index}) => {
    if(!isAuthenticated){
        return <Redirect to='/' />
      }
    return (
        <Link key={index} to={`/profile/${person._id}`} style={{textDecoration:'none'}}>
          <Alert variant="info">
              <div  className="container" style={{fontSize:'1.2rem'}}>
                  <div class="row">
                      <div class="col-md">
                      <Image className="bg-primary" rounded style={{width:'40px',height:'40px'}} src={person.avatar?person.avatar:userImg} />&nbsp;&nbsp;
                      </div>
                      <div class="col-md">
                      <b style={{textTransform:'capitalize'}}>{person.name}</b>
                      </div>
                      <div class="col-md">
                      <b style={{textTransform:'capitalize'}}>{person.email}</b>
                      </div>
                  </div>
              </div>
          </Alert>
        </Link>
    );
}

const mapStateToProps = (state) => {
    return{
      isAuthenticated:state.auth.isAuthenticated
    }
  }

export default connect(mapStateToProps,{})(Person);