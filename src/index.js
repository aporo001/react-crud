import React from 'react';
import { render } from 'react-snapshot';
import { Provider } from 'react-redux';
import { store, browserHistory } from './stores/configStore';
import { ConnectedRouter } from 'react-router-redux';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

render(
  <Provider store={store}>
    <ConnectedRouter history={browserHistory}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
