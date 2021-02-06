import {combineReducers} from 'redux'
import Auth from './Auth'
import Alert from './Alert'
import Loader from './Loader'
import Post from './Post'
import Search from './Search'
import Person from './Person'
import Connection from './Connection'
import EditPost from './EditPost'
import Chat from './Chat'

export default combineReducers({
    auth : Auth,
    alert:Alert,
    loader:Loader,
    post:Post,
    search:Search,
    person:Person,
    connection:Connection,
    editpost:EditPost,
    chat:Chat
})