import React from 'react';
import {Jumbotron,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'

import './Landing.css'

const Landing = ({isAuthenticated}) => {
    let history = useHistory();
    if(isAuthenticated){
        history.push('/home');
    }
    
    return (
        <center className="landing">
            <Jumbotron>
            <h1>Social Media App</h1>
            <p>
                This is a MERN Social Media App.
            </p>
            <p>
               
                <Link to="/auth">
                <Button variant="primary">
                Register/Login
                </Button>
                </Link>
            </p>
            </Jumbotron>
        </center>
    );
}

const mapStateToProps = (state) => {
    return{
        isAuthenticated:state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps,{})(Landing);