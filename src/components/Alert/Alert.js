import React from 'react';
import {connect} from 'react-redux'
import {Alert as AlertComponent} from 'react-bootstrap'


const Alert = ({alerts}) => {
return (
         <div className="m-2">
        {
                alerts && alerts.length > 0 &&
                alerts.map((alert,index) => { return (
                <AlertComponent key={index} variant={alert.alertType}>
                <b> 
                    {alert.msg}
                </b>
                </AlertComponent>)})
        
        }
        </div>
)
}
const mapStateToProps = (state) => {
    return {
        alerts:state.alert
    }
}
export default connect(mapStateToProps)(Alert);