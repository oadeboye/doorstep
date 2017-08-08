import Types from '../actions/actionTypes';

const allUsersReducer = (state = {pending: true, users: []}, action) => {
  switch(action.type) {
    case Types.getAllUsersRequested:
      const pendingState = {
        pending: true,
        users: []
      };
      return pendingState;
    case Types.getAllUsersFulfilled:
      const fulfilledState = {
        pending: false,
        users: action.users
      };
      // console.log('FULFILLED ALL USERS', fulfilledState);
      return fulfilledState;
    case Types.getAllUsersRejected:
      const rejectedState = {
        pending: false,
        users: action.error
      };
      // console.log('REJECTED', rejectedState);
      return rejectedState;
    default:
      return state;
  }
};

export default allUsersReducer;
