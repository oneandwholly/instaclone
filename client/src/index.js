import React from 'react';
import ReactDOM from 'react-dom';
import app from './modules/app';
import auth from './modules/auth';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import rootReducer from './rootReducer';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(reduxThunk),
  // other store enhancers if any
));

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({ type: auth.actionTypes.LOGIN });
  //get user info from token
}

ReactDOM.render(
  <Provider store={store}>
    <Router >
      <app.components.App />
    </Router>
  </Provider>, document.getElementById('root'));