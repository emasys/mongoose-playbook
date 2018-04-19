import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { Provider } from 'react-redux';
import store from './store';
import '../styles/styles.scss';

import { isAuthenticated } from './actions/auth';
store.dispatch(isAuthenticated());

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
);
