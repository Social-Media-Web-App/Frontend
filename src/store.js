import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {};

const persistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ['auth'],
    blacklist:['search','alert']
  };

const pReducer = persistReducer(persistConfig, reducers);
const middleware = [thunk];

const store = createStore(pReducer,initialState,applyMiddleware(...middleware));

const persistor = persistStore(store);

export  { persistor, store };