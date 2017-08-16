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
    // case 'persist/REHYDRATE':
    //   console.log("PERSISTING REQUESTS", action.payload.requests.requests);
    //   const persistentState = {
    //     requests: action.payload.requests.requests,
    //     pending: false
    //   };
    //   return persistentState;
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
      console.log('FULFILLED REMOVE REQUEST', removeFulfilledState);
      return removeFulfilledState;
    case Types.removeRequestRejected:
      const removeRejectedState = {
        pending: false,
        error: action.error
      };
      console.log('ERROR REMOVING REQUEST', removeRejectedState);
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
      console.log('FULFILLED OFFER', offerFulfilledState);
      return offerFulfilledState;
    case Types.offerRejected:
      const offerRejectedState = {
        pending: false,
        error: action.error
      };
      console.log('REJECTED OFFER', offerRejectedState);
      return offerRejectedState;
    default:
      return state;
  }
};

export default requestsReducer;
