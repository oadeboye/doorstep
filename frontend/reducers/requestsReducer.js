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
    case Types.removeRequestRequested:
      const removeRequestedState = {
        pending: true,
        requests: []
      };
      return removeRequestedState;
    case Types.removeRequestFulfilled:
      const removeFulfilledState = {
        pending: false,
        requests: action.requests
      };
      return removeFulfilledState;
    case Types.removeRequestRejected:
      const removeRejectedState = {
        pending: false,
        error: action.error
      };
      return removeRejectedState;
    case Types.offerRequested:
      const offerPendingState = {
        pending: true,
        requests: []
      };
      return offerPendingState;
    case Types.offerFulfilled:
      const offerFulfilledState = {
        pending: false,
        requests: action.requests
      };
      return offerFulfilledState;
    case Types.offerRejected:
      const offerRejectedState = {
        pending: false,
        error: action.error
      };
      return offerRejectedState;
    default:
      return state;
  }
};

export default requestsReducer;
