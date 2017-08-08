import Types from '../actions/actionTypes';

const commUsersReducer = (state = {pending: true, commUsers: []}, action) => {
  switch(action.type) {
    case Types.getCommUsersRequested:
      const getPendingState = {
        pending: true,
        commUsers: []
      };
      // console.log('PENDING COMM USERS', pendingState);
      return getPendingState;
    case Types.getCommUsersFulfilled:
      const getFulfilledState = {
        pending: false,
        commUsers: action.commUsers
      };
      // console.log('FULFILLED COMM USRES', fulfilledState);
      return getFulfilledState;
    case Types.getCommUsersRejected:
      const getRejectedState = {
        pending: false,
        error: action.error
      };
      // console.log('REJECTED COMM USERS', getRejectedState);
      return getRejectedState;
    case Types.addUserRequested:
      const addPendingState = {
        pending: true,
        commUsers: []
      };
      return addPendingState;
    case Types.addUserFulfilled:
      // console.log('HERE');
      // const commUsers = state;
      // console.log('COMMUSERS', commUsers);
      // commUsers.push(action.newUser);
      const addFulfilledState = {
        pending: false,
        commUsers: action.commUsers
      };
      // console.log('FULFILLED ADDING USER', addFulfilledState);
      return addFulfilledState;
    case Types.addUserRejected:
      const addRejectedState = {
        pending: false,
        error: action.error
      };
      // console.log('REJECTED ADDING USER', addRejectedState);
      return addRejectedState;
    default:
      return state;
  }
};

export default commUsersReducer;
