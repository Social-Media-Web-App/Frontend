import React from 'react';
import LoadingOverlay from 'react-loading-overlay';
import {connect} from 'react-redux'
import {Spinner,Alert} from 'react-bootstrap'

const Loader = ({isActive}) => {
    return (
        <>
        {   isActive &&
           <Alert className="m-3" style={{textAlign:'center'}} variant="dark" >
           <h3><Spinner style={{marginRight:'10px'}} size={20} animation="border" role="status" />Loading</h3>
           </Alert>
        }
        </>
    )
}

const mapStateToProps = (state) => {
    return{
        isActive:state.loader.isActive
    }
}

export default connect(mapStateToProps)(Loader);