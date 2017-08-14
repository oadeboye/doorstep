import Types from '../actions/actionTypes';

const commUsersReducer = (state = {pending: true, commUsers: []}, action) => {
  switch(action.type) {
    case Types.getCommUsersRequested:
      const getPendingState = {
        pending: true,
        commUsers: []
      };
      return getPendingState;
    case Types.getCommUsersFulfilled:
      const getFulfilledState = {
        pending: false,
        commUsers: action.commUsers
      };
      return getFulfilledState;
    case Types.getCommUsersRejected:
      const getRejectedState = {
        pending: false,
        error: action.error
      };
      return getRejectedState;
    case Types.addUserRequested:
      const addPendingState = {
        pending: true,
        commUsers: []
      };
      return addPendingState;
    case Types.addUserFulfilled:
      const addFulfilledState = {
        pending: false,
        commUsers: action.commUsers
      };
      return addFulfilledState;
    case Types.addUserRejected:
      const addRejectedState = {
        pending: false,
        error: action.error
      };
      return addRejectedState;
    case Types.removeMemberRequested:
      const removePendingState = {
        pending: true,
        commUsers: []
      };
      return removePendingState;
    case Types.removeMemberFulfilled:
      const removeFulfilledState = {
        pending: false,
        commUsers: action.commUsers
      };
      return removeFulfilledState;
    case Types.removeMemberRejected:
      const removeRejectedState = {
        pending: false,
        error: action.error
      };
      return removeRejectedState;
    default:
      return state;
  }
};

export default commUsersReducer;
