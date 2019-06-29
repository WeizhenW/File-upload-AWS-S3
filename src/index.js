import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
//reducer
import { Provider } from 'react-redux';
import {  applyMiddleware, createStore, combineReducers } from 'redux';
import { logger } from 'redux-logger'; 
import reducers from './redux/reducers';
//saga
import createSagaMiddleware from 'redux-saga';
import rootSaga from './redux/urlSaga';



//create saga middleware
const sagaMiddleware = createSagaMiddleware();

//create store instance
const storeInstance = createStore(
    combineReducers(
        reducers,
    ),
    applyMiddleware(logger, sagaMiddleware),
);




//allow saga run watcherSaga
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));

