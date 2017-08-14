import Types from './actionTypes';
import axios from 'axios';

export function getCommUsers(commId) {
  return dispatch => {
    dispatch({
      type: Types.getCommUsersRequested
    });
    const error = false;
    axios.get('/api/community/' + commId)
    .then(response => {
      const commUsers = response.data.community.users;
      // console.log('RESPONSE', response);
      // console.log('DISPATCHED USERS', users);
      return dispatch({
        type: Types.getCommUsersFulfilled,
        commUsers
      });
    })
    .catch(error => {
      // console.log('ERROR HERE', error);
      return dispatch({
        type: Types.getCommUsersRejected,
        error
      });
    });
  };
}
