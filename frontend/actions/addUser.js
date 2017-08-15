import Types from './actionTypes';
import axios from 'axios';

export function addUser(username, communityId) {
  return dispatch => {
    dispatch({
      type: Types.addUserRequested
    });
    const error = false;
    axios.post('/api/user', {
      username,
      communityId
    })
    .then((response) => {
      axios.get('/api/users/' + username) // get user object from their username
      .then((resp) => {
        axios.get('/api/community/' + communityId)
        .then((res) => {
          const commUsers = res.data.community.users;
          return dispatch({
            type: Types.addUserFulfilled,
            commUsers
          });
        });
      });
    })
    .catch((error) => {
      return dispatch({
        type: Types.addUserRejected,
        error: error
      });
    });
  };
}
