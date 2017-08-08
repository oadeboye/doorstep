import Types from '../actions/actionTypes';

const allUsersReducer = (state = {pending: true, users: []}, action) => {
  switch(action.type) {
    case Types.getAllUsersRequested:
      const pendingState = {
        pending: true,
        users: []
      };
      return pendingState;
    case Types.getAllCommunitiesFulfilled:
      const fulfilledState = {
        pending: false,
        users: action.users
      };
      console.log('FULFILLED', fulfilledState);
      return fulfilledState;
    case Types.getAllCommunitiesRejected:
      const rejectedState = {
        pending: false,
        users: action.error
      };
      console.log('REJECTED', rejectedState);
      return rejectedState;
    default:
      return state;
  }
};

export default allUsersReducer;
