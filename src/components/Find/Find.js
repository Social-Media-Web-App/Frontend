import React, { useState,useEffect } from 'react';
import {Badge,InputGroup,FormControl,Button,Alert} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {FcSearch} from 'react-icons/fc'

import {Search} from '../../actions/search'
import Person from './Person';

const Find = ({isAuthenticated,Search,searchResult}) => {
    const [term,setTerm] = useState('');
    if(!isAuthenticated){
        return <Redirect to='/' />
      }
    return (
            <div style={{marginTop:(searchResult && searchResult.length>0)?'5%':'15%'}}>
              <div style={{textAlign:'center',marginBottom:'2rem'}}>
              <Badge style={{fontSize:'7vh',fontWeight:'bold'}} variant="primary">Search and Find People</Badge>
              </div>
              <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1"><FcSearch/></InputGroup.Text>
              </InputGroup.Prepend>
                <FormControl
                  style={{textTransform:'lowercase',outlineColor:'blue',outlineStyle:'solid',outlineWidth:'0.6px',textTransform:'lowercase'}}
                  placeholder="Enter Name or Email to search...."
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={term}
                  onChange={(event) => setTerm(event.target.value)}
                />
                <InputGroup.Append>
                  <Button onClick={() => {
                    if(term !== ''){
                      Search({term});
                    }
                  }} variant="outline-primary">Search</Button>
                </InputGroup.Append>
              </InputGroup>
              {
                searchResult ?
                <div>
                <hr style={{border:'0.6px solid lightgray'}} />
                <Alert className="mb-3" variant="secondary"><b>{searchResult.length} results found.</b></Alert>
                </div>
                :null
              }
              {
                searchResult &&
                searchResult.length > 0 ? 
                searchResult.map((person,index) => {
                  return (
                    <Person person={person} index={index} />
                  )
                }):null
              }
            </div>
    );
}

const mapStateToProps = (state) => {
    return{
      isAuthenticated:state.auth.isAuthenticated,
      searchResult : state.search
    }
  }

export default connect(mapStateToProps,{Search})(Find);