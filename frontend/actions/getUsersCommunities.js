import Types from './actionTypes';
import axios from 'axios';

export function getUsersCommunities(userId) {
  console.log("IN DISPATCH");
  return dispatch => {
    dispatch({
      type: Types.getUsersCommunitiesRequested
    });
    axios.get('/api/communities/' + userId)
    .then(response => {
      const userCommunities = response.data;
      console.log('USER COMMUNITIES RESPONSE', userCommunities);
      return dispatch({
        type: Types.getUsersCommunitiesFulfilled,
        data: userCommunities
      });
    })
    .catch(error => {
      console.log('ERROR HERE', error);
      return dispatch({
        type: Types.getUsersCommunitiesRejected,
        error: error
      });
    });
  };
}
