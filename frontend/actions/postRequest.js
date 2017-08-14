import Types from './actionTypes';
import axios from 'axios';

export function postRequest(requester, communityId, text) {
  return dispatch => {
    dispatch({
      type: Types.postRequestRequested
    });
    const error = false;
    axios.post('/api/request', {
      requester,
      communityId,
      text,
      datePosted: new Date()
    })
    .then(response => {
      axios.get('/api/community/' + communityId) // populate requests
      .then(resp => {
        const requests = resp.data.community.requests;
        dispatch({
          type: Types.postRequestFulfilled,
          requests
        });
      });
    })
    .catch(error => {
      console.log('ERROR', error);
      dispatch({
        type: Types.postRequestRejected,
        error
      });
    });
  };
}
