import "core-js/stable";
import "regenerator-runtime/runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/app';

const initialState = window.__STATE__ || {};
const store = createStore(reducers, initialState, applyMiddleware(thunk));

ReactDOM.hydrate(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);
