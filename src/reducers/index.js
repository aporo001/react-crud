import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { photos } from './Photos';

export default  combineReducers({
    photos,
    router: routerReducer
  });