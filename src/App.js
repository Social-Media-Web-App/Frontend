import React,{Fragment,useEffect} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {Spinner} from 'react-bootstrap'

import Home from './components/Home/Home';
import Alert from './components/Alert/Alert'
import Loader from './components/Loader/Loader'
import Auth from './components/Auth/Auth';
import Landing from './components/Landing/Landing';
import NavigationBar from './components/NavigationBar';
import Settings from './components/Settings/Settings';

import {store,persistor} from './store'
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

function App(){
	if(localStorage.getItem('token')){
		setAuthToken(localStorage.getItem('token'))
   }
	/* useEffect(() => {
       store.dispatch(loadUser());
	}) */
  return (
	  <Provider store={store}>
		   <PersistGate loading={<Spinner size={30} />} persistor={persistor}>
            <Router >
				<Fragment>
					<NavigationBar />
					<section className="container" >
						<Alert/>
						<Loader/>
					    <Route exact path='/' component={Landing} />
						<Switch>
							<Route path='/auth' component={Auth} />
							<Route path='/home' component={Home} />
							<Route path='/settings' component={Settings} />
						</Switch>
					</section>
				</Fragment>
			</Router>
			</PersistGate>
	 </Provider>
  );
}

export default App;
