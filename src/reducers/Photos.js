import {
  LOAD_PHOTOS_SUCCESS,
} from '../constants/ActionTypes';

export function photos(state = [], action) {
  switch (action.type) {
    case LOAD_PHOTOS_SUCCESS:
      return action.data;
    default:
      return state;
  }
}