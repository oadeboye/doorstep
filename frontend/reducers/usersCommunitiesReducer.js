import Types from '../actions/actionTypes';

const usersCommunitiesReducer = (state = {pending: false, data: []}, action) => {
  switch(action.type) {
    case Types.getUsersCommunitiesRequested:
      const pendingState = {
        pending: true,
        data: []
      };
      return pendingState;
    case Types.getUsersCommunitiesFulfilled:
      const fulfilledState = {
        pending: false,
        data: action.data
      };
      return fulfilledState;
    case Types.getUsersCommunitiesRejected:
      const rejectedState = {
        pending: false,
        error: action.error
      };
      return rejectedState;
    case Types.removeSelfRequested:
      console.log("REMOVE REQUESTED");
      const pendingRemove = {
        pending: true,
        data: state.data.slice()
      };
      return pendingRemove;
    case Types.removeSelfFulfilled:
      console.log("REMOVE FULFILLED");
      const removeFulfilled = {
        pending: false,
        data: action.data
      };
      return removeFulfilled;
    case Types.removeSelfRejected:
      console.log("REMOVE REJECTED");
      const removeRejected = {
        pending: false,
        error: action.error
      };
      return removeRejected;
    default:
      return state;
  }
};

export default usersCommunitiesReducer;
