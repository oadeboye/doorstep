import Types from './actionTypes';
import axios from 'axios';

export function editCommunity (name, description, communityId) {
  return dispatch => {
    dispatch({
      type: Types.editCommunityRequested
    });
    const error = false;
    axios.post('/api/edit-community/' + communityId, {
      name,
      description
    })
    .then(response => {
      const community = response.data.community;
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
