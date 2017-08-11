import Types from './actionTypes';
import axios from 'axios';

export function getRequests(communityId) {
  return dispatch => {
    dispatch({
      type: Types.getRequestsRequested
    });
    const error = false;
    axios.get('/api/community/' + communityId)
    .then(response => {
      const requests = response.data.community.requests;
      dispatch({
        type: Types.getRequestsFulfilled,
        requests
      });
    })
    .catch(error => {
      console.log('ERROR DISPATCH', error);
      dispatch({
        type: Types.getRequestsRejected,
        error
      });
    });
  };
}
