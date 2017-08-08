import Types from './actionTypes';
import axios from 'axios';

export function getAllUsers() {
  return dispatch => {
    dispatch({
      type: Types.getAllUsersRequested
    });
    const error = false;
    axios.get('http://localhost:3000/')
    .then(response => {
      const users = response.data.users;
      console.log('ACTION DISPATCHED', users);
      return dispatch({
        type: Types.getAllUsersFulfilled,
        users: response.data.users
      });
    })
    .catch(error => {
      console.log('ERROR', error);
      return dispatch({
        type: Types.getAllUsersRejected,
        error: error
      });
    });
  };
}
