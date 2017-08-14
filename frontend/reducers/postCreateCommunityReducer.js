import Types from '../actions/actionTypes';

const postCreateCommunityReducer = (state = {pending: true, data: []}, action) => {
  switch(action.type) {
    case Types.postCreateCommunityRequested:
      const pendingState = {
        pending: true
      };
      return pendingState;
    case Types.postCreateCommunityFulfilled:
      const fulfilledState = {
        pending: false,
        success: true,
        data: action.data
      };
      return fulfilledState;
    case Types.postCreateCommunityRejected:
      const rejectedState = {
        pending: false,
        success: false,
        error: action.error
      };
      return rejectedState;
    case Types.clearCreateCommunityStatus:
      const resetState = {
        pending: true,
        data: []
      };
      return resetState;
    default:
      return state;
  }
};

export default postCreateCommunityReducer;
