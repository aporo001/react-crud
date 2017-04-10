import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createMemoryHistory';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk'
import Reducers from '../reducers'

const history = createHistory();
  const middleware = [thunk, routerMiddleware(history)];

export const store = createStore(
  Reducers,
  applyMiddleware(...middleware)
);


