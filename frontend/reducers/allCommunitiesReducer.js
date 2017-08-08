import Types from '../actions/actionTypes';

const allCommunitiesReducer = (state = {pending: false, communities: []}, action) => {
  switch(action.type) {
    case Types.getAllCommunitiesRequested:
      const pendingState = {
        pending: true,
        communities: []
      };
      return pendingState;
    case Types.getAllCommunitiesFulfilled:
      const fulfilledState = {
        pending: false,
        communities: action.data
      };
      return fulfilledState;
    case Types.getAllCommunitiesRejected:
      const rejectedState = {
        pending: false,
        data: action.error
      };
      return rejectedState;
    default:
      return state;
  }
};

export default allCommunitiesReducer;
