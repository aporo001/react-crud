
import axios from 'axios';
import {
  LOAD_PHOTOS_REQUEST,
  LOAD_PHOTOS_SUCCESS,
  LOAD_PHOTOS_FAILURE
} from '../constants/ActionTypes';

export const loadData = () => {
  return  (dispatch) => {
    dispatch(requestData());
    return axios.get('http://localhost:5000/photos')
      .then(response => response.data)
      .then(json => {
        dispatch(responseData(json))
      })
      .catch((error) => {
        dispatch(reponseError(error));
      });
  }
}

export const removeData = (id) => {
  return  (dispatch) => {
    dispatch(requestData());
    return axios.delete('http://localhost:5000/photos/' + id)
      .then(() => {
        dispatch(loadData());
      })
      .catch((error) => {
        dispatch(reponseError(error));
      });
  }
}

function requestData () {
  return {
    type: LOAD_PHOTOS_REQUEST
  };
}

function responseData (response) {
  console.log('test'+ response);
  return {
    type: LOAD_PHOTOS_SUCCESS,
    data: response
  }
}

function reponseError (errorMessage) {
  return {
    type: LOAD_PHOTOS_FAILURE,
    errorMessage: errorMessage
  }
}