import React from 'react';
import {Tabs,Tab,Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import Person from './Person'

const Connection = ({isAuthenticated}) => {
    if(!isAuthenticated){
        return <Redirect to='/' />
      }
    return (
            <div className="container">
                <center>
              <Tabs class="row" defaultActiveKey="following" id="uncontrolled-tab-example">
                <Tab className="col" eventKey="following" title="Home">
                    {/* <Person /> */}
                    <div class="col col-lg-2">
                    1 of 3
                    </div>
                </Tab>
                <Tab className="col" eventKey="followers" title="Profile">
                    {/* <Person /> */}
                    <div class="col col-lg-2">
                        1 of 3
                        </div>
                </Tab>
             </Tabs>
             </center>
             </div>
    );
}

const mapStateToProps = (state) => {
    return{
      isAuthenticated:state.auth.isAuthenticated
    }
  }

export default connect(mapStateToProps,{})(Connection);