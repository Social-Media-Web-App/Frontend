import {combineReducers} from 'redux'
import Auth from './Auth'
import Alert from './Alert'
import Loader from './Loader'
import Post from './Post'
import Search from './Search'
import Person from './Person'
import Connection from './Connection'

export default combineReducers({
    auth : Auth,
    alert:Alert,
    loader:Loader,
    post:Post,
    search:Search,
    person:Person,
    connection:Connection
})