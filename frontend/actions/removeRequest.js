import Types from './actionTypes';
import axios from 'axios';

export function removeRequest(requestId, communityId) {
  return dispatch => {
    dispatch({
      type: Types.removeRequestRequested
    });
    const error = false;
    axios.post('/api/remove-request/' + requestId)
    .then(response => {
      axios.get('/api/community/' + communityId)
      .then(resp => {
        dispatch({
          type: Types.removeRequestFulfilled,
          requests: resp.data.community.requests
        });
      });
    })
    .catch(error => {
      dispatch({
        type: Types.removeRequestRejected,
        error
      });
    });
  };
}
