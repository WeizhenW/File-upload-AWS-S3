import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import { Provider } from 'react-redux';
import {  applyMiddleware, createStore, combineReducers } from 'redux';
import { logger } from 'redux-logger'; 
import reducers from './redux/reducers';


//create store instance
const storeInstance = createStore(
    combineReducers(
        reducers,
    ),
    applyMiddleware(logger),
);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));

