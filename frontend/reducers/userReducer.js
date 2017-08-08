import Types from '../actions/actionTypes';

const userReducer = (state = {user: {}, pending: true}, action) => {
  switch(action.type) {
    case Types.saveUserRequested:
      console.log("INSIDE REQUESTED");
      const pendingState = {
        pending: true,
        user: {}
      };
      return pendingState;
    case Types.saveUserFulfilled:
      console.log("INSIDE FULFILLED");
      const fulfilledState = {
        pending: false,
        user: Object.assign({}, action.user)
      };
      return fulfilledState;
    case Types.saveUserRejected:
      console.log("INSIDE REJECTED");
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
      console.log("UPDATED USER OBJ", updatedUser);
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
        pending: false
      };
      return logoutState;
    case 'persist/REHYDRATE':
      const persistentState = {
        user: action.payload,
        pending: false
      };
      return persistentState;
    default:
      return state;
  }
};

export default userReducer;
