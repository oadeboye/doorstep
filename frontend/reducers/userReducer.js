import Types from '../actions/actionTypes';

const userReducer = (state = {user: {}, pending: true}, action) => {
  switch(action.type) {
    case Types.saveUserRequested:
      const pendingState = {
        pending: true,
        user: {}
      };
      return pendingState;
    case Types.saveUserFulfilled:
      const fulfilledState = {
        pending: false,
        user: Object.assign({}, action.user)
      };
      return fulfilledState;
    case Types.saveUserRejected:
      const rejectedState = {
        pending: false,
        error: action.error
      };
      return rejectedState;
    case Types.editUserRequested:
      const pendingEditState = Object.assign({}, state, { pending: true });
      return pendingEditState;
    case Types.editUserFulfilled:
      const updatedUser = Object.assign({}, state.user, action.edits);
      const editedState = {
        user: updatedUser,
        pending: false
      };
      return editedState;
    case Types.editUserRejected:
      const rejectEditState = Object.assign({}, state, { error: action.error });
      return rejectEditState;
    case 'LOGOUT_USER':
      const logoutState = {
        user: {},
        pending: true
      };
      return logoutState;
    case 'persist/REHYDRATE':
      console.log("PERSISTING USER", action.payload.user);
      const persistentState = {
        user: action.payload.user.user,
        pending: false
      };
      return persistentState;
    case Types.requestItemRequested:
      const requestedPendingState = Object.assign({}, state, { pending: true });
      return requestedPendingState;
    case Types.requestItemFulfilled:
      const updatedUserWithRequest = Object.assign({}, state.user, { pendingRequests: action.pendingRequests });
      const requestItemFulfilledState =  {
        pending: false,
        user: updatedUserWithRequest
      };
      console.log('FULFILLED PENDING REQUESTS', requestItemFulfilledState);
      return requestItemFulfilledState;
    case Types.requestItemRejected:
      const requestItemRejectedState = Object.assign({}, state, { error: action.error });
      console.log('REJECTED PENDING REQUEST', requestItemRejectedState);
      return requestItemRejectedState;
    default:
      return state;
  }
};

export default userReducer;
