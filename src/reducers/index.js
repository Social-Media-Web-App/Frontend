import {combineReducers} from 'redux'
import Auth from './Auth'
import Alert from './Alert'
import Loader from './Loader'
import Post from './Post'


export default combineReducers({
    auth : Auth,
    alert:Alert,
    loader:Loader,
    post:Post
})