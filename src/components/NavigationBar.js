import React from 'react';
import {Navbar,Nav,NavDropdown,Image,Dropdown} from 'react-bootstrap';
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../actions/auth'
import userImg from '../utils/user.png'
import {setNavigator} from '../utils/Navigate';
import {TiSocialLastFm} from 'react-icons/ti'

const linkStyle = {textDecoration: 'none',color: 'white' };

const NavigationBar = ({isAuthenticated,user,logout,history}) => {
   setNavigator(history);
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand><Link style={linkStyle} to="/home" style={{fontWeight:'bold',color:'lightblue',textDecoration:'none'}}><TiSocialLastFm  color="lightblue" size={40}/>&nbsp;Sociofy</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            { !isAuthenticated?<Nav.Link><Link style={linkStyle} to="/auth">Login/Register</Link></Nav.Link>:null}
            { isAuthenticated?<Nav.Link ><Link style={linkStyle} to="/connection">Connections</Link></Nav.Link>:null}
            { isAuthenticated?<Nav.Link ><Link style={linkStyle} to="/find">Find People</Link></Nav.Link>:null}
            { isAuthenticated?<Nav.Link ><Link style={linkStyle} to="/chat">Chat</Link></Nav.Link>:null}
          </Nav>
        </Navbar.Collapse>
        {
        isAuthenticated && user &&
        <Navbar.Collapse className="justify-content-end " style={{marginRight:'1rem'}}>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
             <b style={{fontWeight:'bold'}}>
            Signed in as : {user.name}&nbsp;&nbsp;<Image rounded style={{width:'32px',height:'32px'}} src={user.avatar?user.avatar:userImg} />&nbsp;
            </b>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/settings"><Link style={{...linkStyle,color:'black',width:'100%',height:'100%'}} to="/settings">Settings</Link></Dropdown.Item>
            <Dropdown.Item onClick={() => logout(history)} href="#">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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