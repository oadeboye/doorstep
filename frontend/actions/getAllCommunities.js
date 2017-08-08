import Types from './actionTypes';
import axios from 'axios';

export function getAllCommunities() {
  return dispatch => {
    dispatch({
      type: Types.getAllCommunitiesRequested
    });
    const error = false;
    axios.get('/api/communities/all')
    .then(response => {
      const communities = response.data.communities;
      return dispatch({
        type: Types.getAllCommunitiesFulfilled,
        data: communities
      });
    })
    .catch(error => {
      return dispatch({
        type: Types.getAllCommunitiesRejected,
        error: error
      });
    });
  };
}
