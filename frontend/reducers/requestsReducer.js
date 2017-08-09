import Types from '../actions/actionTypes';

const requestsReducer = (state = {pending: true, requests: []}, action) => {
  switch(action.type) {
    case Types.getRequestsRequested:
      const getPendingState = {
        pending: true,
        requests: []
      };
      return getPendingState;
    case Types.getRequestsFulfilled:
      const getFulfilledState = {
        pending: false,
        requests: action.requests
      };
      // console.log('FULFILLED REQUESTS', getFulfilledState);
      return getFulfilledState;
    case Types.getRequestsRejected:
      const getRejectedState = {
        pending: false,
        error: action.error
      };
      // console.log('REJECTED REQUESTS', getRejectedState);
      return getRejectedState;
    case Types.postRequestRequested:
      const postPendingState = {
        pending: true,
        requests: []
      };
      return postPendingState;
    case Types.postRequestFulfilled:
      const postFulfilledState = {
        pending: false,
        requests: action.requests
      };
      console.log('FULFILLED REQUESTS', postFulfilledState);
      return postFulfilledState;
    case Types.postRequestRejected:
      const postRejectedState = {
        pending: false,
        error: action.error
      };
      console.log('REJECTED REQUESTS', postRejectedState);
      return postRejectedState;
    default:
      return state;
  }
};

export default requestsReducer;
