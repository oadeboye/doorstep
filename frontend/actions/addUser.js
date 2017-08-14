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
          // const newUser = resp.data.user;
          // console.log('ADD USER DISPATCH', newUser);
          const commUsers = res.data.community.users;
          // console.log('UPDATING COMM USERS', commUsers);
          return dispatch({
            type: Types.addUserFulfilled,
            commUsers
          });
        });
      });
    })
    .catch((error) => {
      console.log("ADD USER DISPATCH ERROR", error);
      return dispatch({
        type: Types.addUserRejected,
        error: error
      });
    });
  };
}
