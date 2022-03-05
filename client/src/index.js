import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game'
import {Provider} from 'react-redux'
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from  './reducer'


const initialState={
  user:{
    user:localStorage.getItem('User')?JSON.parse(localStorage.getItem('User')):null
  }
}
const composeEnhancers= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer,initialState,composeEnhancers(applyMiddleware(thunk)))
ReactDOM.render(
  <Provider store={store}>
      <Game />
  </Provider>,
  document.getElementById('root')
);


