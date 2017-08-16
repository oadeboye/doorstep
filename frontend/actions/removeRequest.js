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
      console.log('RESPONSE', response);
      axios.get('/api/community/' + communityId)
      .then(resp => {
        console.log('update requests');
        dispatch({
          type: Types.removeRequestFulfilled,
          requests: resp.data.community.requests
        });
      });
    })
    .catch(error => {
      console.log('error dispatching', error);
      dispatch({
        type: Types.removeRequestRejected,
        error
      });
    });
  };
}
