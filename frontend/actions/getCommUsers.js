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
      return dispatch({
        type: Types.getCommUsersFulfilled,
        commUsers
      });
    })
    .catch(error => {
      return dispatch({
        type: Types.getCommUsersRejected,
        error
      });
    });
  };
}
