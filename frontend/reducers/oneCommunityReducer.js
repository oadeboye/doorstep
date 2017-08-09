import Types from '../actions/actionTypes';

const oneCommunityReducer = (state = {pending: true, community: {}}, action) => {
  switch(action.type) {
    case Types.getOneCommunityRequested:
      // console.log('PENDING');
      const getPendingState = {
        pending: true,
        community: {}
      };
      return getPendingState;
    case Types.getOneCommunityFulfilled:
      const getFulfilledState = {
        pending: false,
        community: Object.assign({}, action.community)
      };
      console.log('FULFILLED', getFulfilledState);
      return getFulfilledState;
    case Types.getOneCommunityRejected:
      const getRejectedState = {
        pending: false,
        error: action.error
      };
      console.log('REJECTED', getRejectedState);
      return getRejectedState;
    case Types.editCommunityRequested:
      const editPendingState = {
        pending: true,
        community: {}
      };
      return editPendingState;
    case Types.editCommunityFulfilled:
      const editFulfilledState = {
        pending: false,
        community: action.community
      };
      console.log('FULFILLED EDIT', editFulfilledState);
      return editFulfilledState;
    case Types.editCommunityRejected:
      const editRejectedState = {
        pending: false,
        error: action.error
      };
      console.log('REJECTED EDIT', editRejectedState);
      return editRejectedState;
    default:
      return state;
  }
};

export default oneCommunityReducer;
