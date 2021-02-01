import React from 'react';
import {Jumbotron,Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import AddPost from './AddPost'
import ShowPost from './ShowPost'

const Home = ({isAuthenticated}) => {
    if(!isAuthenticated){
        return <Redirect to='/' />
      }
    return (
            <div>
              <AddPost/>
              <br/>
              <ShowPost/>
            </div>
    );
}

const mapStateToProps = (state) => {
    return{
      isAuthenticated:state.auth.isAuthenticated
    }
  }

export default connect(mapStateToProps,{})(Home);