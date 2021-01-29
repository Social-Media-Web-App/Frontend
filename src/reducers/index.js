import {combineReducers} from 'redux'
import Auth from './Auth'
import Alert from './Alert'
import Loader from './Loader'

export default combineReducers({
    auth : Auth,
    alert:Alert,
    loader:Loader
})