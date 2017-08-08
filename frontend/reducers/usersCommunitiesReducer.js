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
    default:
      return state;
  }
};

export default usersCommunitiesReducer;
