import React,{useState} from 'react';
import {Modal,Card,ListGroup,ListGroupItem,Button,Image} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

function MyResume(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Adarsh's Resume
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Image  style={{width:'70vh'}} src="https://res.cloudinary.com/gadarsh555/image/upload/v1612704057/avatars/Adarsh-Resume-1_qdwv4k.png" />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

const About = ({isAuthenticated}) => {
    const [modalShow, setModalShow] = React.useState(false);
    if(!isAuthenticated){
        return <Redirect to='/' />
      }
    return (
        <div className="d-flex justify-content-center mt-3">
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" style={{alignSelf:'center',width:'30vh'}} src="https://res.cloudinary.com/gadarsh555/image/upload/v1612697050/avatars/adarsh_tsosle.jpg" />
        <Card.Body style={{textAlign:'center'}}>
          <h5>Sociofy Developed by : Adarsh Gautam</h5>
            Third year,Computer Science and Engineering Undergraduate at NIT Jamshedpur
            From Lucknow,India
        </Card.Body>
        <ListGroup style={{textAlign:'center'}} className="list-group-flush">
          <b>Email :   <Card.Link href="#">gadarsh555@gmail.com</Card.Link></b>
          <b>Github : <Card.Link href="https://github.com/gadarsh555">github.com/gadarsh555</Card.Link></b>
          <b>Linkedin : <Card.Link href="https://linkedin.com/in/gadarsh555">linkedin.com/in/gadarsh555</Card.Link></b>
          <ListGroupItem className="btn-outline-primary" style={{cursor:'pointer',border:'1px solid gray'}} onClick={() => setModalShow(true)}>Resume</ListGroupItem>
        </ListGroup>
      </Card>
      <MyResume
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      </div>
    );
}

const mapStateToProps = (state) => {
    return{
      isAuthenticated:state.auth.isAuthenticated
    }
  }

export default connect(mapStateToProps,{})(About);