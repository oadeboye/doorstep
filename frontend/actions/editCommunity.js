import Types from './actionTypes';
import axios from 'axios';

export function editCommunity (name, description, communityId) {
  return dispatch => {
    dispatch({
      type: Types.editCommunityRequested
    });
    const error = false;
    console.log('COMMUNITY ID', communityId);
    axios.post('/api/edit-community/' + communityId, {
      name,
      description
    })
    .then(response => {
      const community = response.data.community;
      console.log('RESPONSE', response);
      console.log('EDIT DISPATCH', community);
      dispatch({
        type: Types.editCommunityFulfilled,
        community
      });
    })
    .catch(error => {
      dispatch({
        type: Types.editCommunityRejected,
        error
      });
    });
  };
}
