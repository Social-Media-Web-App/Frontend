import React from 'react';
import {Jumbotron,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import './Landing.css'

const Landing = () => {
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

export default Landing;