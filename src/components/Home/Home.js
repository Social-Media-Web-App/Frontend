import React from 'react';
import {Jumbotron,Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const Home = ({isAuthenticated}) => {
  console.log('isAuthenticated :',isAuthenticated);
    if(!isAuthenticated){
        return <Redirect to='/' />
      }
    return (
            <Jumbotron>
            <h1>Hello, world!</h1>
            <p>
                This is a simple hero unit, a simple jumbotron-style component for calling
                extra attention to featured content or information.
            </p>
            <p>
                <Button variant="primary">Learn more</Button>
            </p>
            </Jumbotron>
    );
}

const mapStateToProps = (state) => {
    return{
      isAuthenticated:state.auth.isAuthenticated
    }
  }

export default connect(mapStateToProps,{})(Home);