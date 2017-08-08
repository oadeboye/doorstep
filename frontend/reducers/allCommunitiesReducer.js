import Types from '../actions/actionTypes';

const allCommunitiesReducer = (state = {pending: false, data: []}, action) => {
  switch(action.type) {
    case Types.getAllCommunitiesRequested:
      const pendingState = {
        pending: true,
        data: []
      };
      return pendingState;
    case Types.getAllCommunitiesFulfilled:
      const fulfilledState = {
        pending: false,
        data: action.data
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
