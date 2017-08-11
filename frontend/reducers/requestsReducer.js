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
      return getFulfilledState;
    case Types.getRequestsRejected:
      const getRejectedState = {
        pending: false,
        error: action.error
      };
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
      return postFulfilledState;
    case Types.postRequestRejected:
      const postRejectedState = {
        pending: false,
        error: action.error
      };
      return postRejectedState;
    default:
      return state;
  }
};

export default requestsReducer;
