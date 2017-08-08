import Types from './actionTypes';
import axios from 'axios';

export function getOneCommunity(communityId) {
  return dispatch => {
    dispatch({
      type: Types.getOneCommunityRequested
    });
    const error = false;
    axios.get('/api/community/' + communityId)
    .then(response => {
      const community = response.data.community;
      console.log('RESPONSE', response);
      console.log('DISPATCHED COMMUNITY', community);
      return dispatch({
        type: Types.getOneCommunityFulfilled,
        community: community
      });
    })
    .catch(error => {
      console.log('ERROR HERE', error);
      return dispatch({
        type: Types.getOneCommunityRejected,
        error: error
      });
    });
  };
}
