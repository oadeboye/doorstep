import Types from './actionTypes';
import axios from 'axios';
import domain from '../domain';

export function saveUser(username, password) {
  return dispatch => {
    dispatch({
      type: Types.saveUserRequested
    });
    const error = false;
    axios.post('/api/auth/login', {
      username: username,
      password: password
    })
    .then(respJson => {
      const user = respJson.data.user;
      return dispatch({
        type: Types.saveUserFulfilled,
        user: user
      });
    })
    .catch(error => {
      console.log("ERROR LOGGING IN", error);
      return dispatch({
        type: Types.saveUserRejected,
        error: error
      });
    });
  };
}
