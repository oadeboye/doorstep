import Types from './actionTypes';
import axios from 'axios';

export function getAllUsers() {
  return dispatch => {
    dispatch({
      type: Types.getAllUsersRequested
    });
    const error = false;
    axios.get('/api/users')
    .then(response => {
      const users = response.data.users;
      // console.log('DISPATCH ALL USERS', users);
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
