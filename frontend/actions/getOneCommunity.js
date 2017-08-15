import Types from './actionTypes';
import axios from 'axios';

export function getOneCommunity(communityId) {
  console.log('HEYYYYYYYYYYYYYYY');
  return dispatch => {
    dispatch({
      type: Types.getOneCommunityRequested
    });
    const error = false;
    console.log("ID IN HERe", communityId);
    axios.get('/api/community/' + communityId)
    .then(response => {
      const community = response.data.community;
      console.log('COMMUNITY HERE', community);
      return dispatch({
        type: Types.getOneCommunityFulfilled,
        community: community
      });
    })
    .catch(error => {
      return dispatch({
        type: Types.getOneCommunityRejected,
        error: error
      });
    });
  };
}
