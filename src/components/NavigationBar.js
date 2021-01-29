import React from 'react';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap';
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../actions/auth'

const linkStyle = {textDecoration: 'none',color: 'white' };

const NavigationBar = ({isAuthenticated,user,logout,history}) => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand><Link style={linkStyle} to="/home">Social Media</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            { !isAuthenticated?<Nav.Link><Link style={linkStyle} to="/auth">Auth</Link></Nav.Link>:null}
            { isAuthenticated?<Nav.Link ><Link style={linkStyle} to="/friends">Friends</Link></Nav.Link>:null}
            { isAuthenticated?<Nav.Link ><Link style={linkStyle} to="/requests">Requests</Link></Nav.Link>:null}
            { isAuthenticated?<Nav.Link ><Link style={linkStyle} to="/find">Find People</Link></Nav.Link>:null}
            { isAuthenticated?<Nav.Link ><Link style={linkStyle} to="/chat">Chat</Link></Nav.Link>:null}
          </Nav>
        </Navbar.Collapse>
        {
        isAuthenticated && user &&
        <Navbar.Collapse className="justify-content-end " style={{marginRight:'1rem'}}>
          <NavDropdown className="rounded-pill text-white" style={{backgroundColor:'yellowgreen'}}  title={<b style={{fontWeight:'bold'}}>Signed in as : {user.name}&nbsp;</b>} id="collasible-nav-dropdown">
          <NavDropdown.Item ><Link style={{...linkStyle,color:'black'}} to="/settings">Settings</Link></NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={() => logout(history)} href="#">Logout</NavDropdown.Item>
          </NavDropdown>   
        </Navbar.Collapse>
        }
      </Navbar>
    );
}

const mapStateToProps = (state) => {
  return{
    user:state.auth.user,
    isAuthenticated:state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps,{logout})(withRouter(NavigationBar));