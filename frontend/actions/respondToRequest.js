import Types from './actionTypes';
import axios from 'axios';

export function respondToRequest(fulfiller, requester, request, communityId) {
  return dispatch => {
    dispatch({
      type: Types.offerRequested
    });
    const error = false;
    axios.post('/twilio/offer/' + request._id, { // send a message to requester and remove request
      to: requester.phone,
      requestItem: request.name,
      fulfiller
    })
    .then(response => {
      axios.get('/api/community/' + communityId)
      .then(resp => {
        dispatch({
          type: Types.offerFulfilled,
          requests: resp.data.community.requests
        });
      });
    })
    .catch(error => {
      dispatch({
        type: Types.offerRejected,
        error
      });
    });
  };
}
