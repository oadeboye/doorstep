import Types from './actionTypes';
import axios from 'axios';

export function removeMember(communityId, userId) {
  return dispatch => {
    dispatch({
      type: Types.removeMemberRequested
    });
    const error = false;
    axios.post('/api/remove-user', {
      communityId,
      userId
    })
    .then(response => {
      axios.get('/api/community/' + communityId)
      .then(resp => { // populate user objects
        const commUsers = resp.data.community.users;
        console.log('REMOVE DISPATCH 2', commUsers);
        dispatch({
          type: Types.removeMemberFulfilled,
          commUsers
        });
      });
    })
    .catch(error => {
      dispatch({
        type: Types.removeMemberRejected,
        error
      });
    });
  };
}
