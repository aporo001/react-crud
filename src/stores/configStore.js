import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk'
import Reducers from '../reducers'

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

const history = createHistory();
const middleware = [thunk, routerMiddleware(history)];

const composeEnhancers = composeWithDevTools({
  // options like actionSanitizer, stateSanitizer
});



export const store = createStore(
  Reducers,
  preloadedState,
  composeEnhancers(
    applyMiddleware(...middleware)
  ) 
);

export const browserHistory = history;