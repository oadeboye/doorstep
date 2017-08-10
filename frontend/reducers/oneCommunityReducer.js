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
      // console.log('REJECTED', rejectedState);
      return rejectedState;
    case Types.addItemRequested:
      const pendingItem = {
        pending: true,
        community: Object.assign({}, state.community)
      };
      return pendingItem;
    case Types.addItemFulfilled:
      console.log("FULFILLED ON ADD ITEM");
      const addItem = {
        pending: false,
        community: action.community
      };
      return addItem;
    case Types.addItemRejected:
      console.log("REJECTED ON ADD ITEM");
      const rejectedItem = {
        pending: false,
        community: Object.assign({}, state.community)
      };
      return rejectedItem;
    case Types.removeItemRequested:
      const pendingRemoveItem = {
        pending: true,
        community: Object.assign({}, state.community)
      };
      return pendingRemoveItem;
    case Types.removeItemFulfilled:
      console.log("FULFILLED ON REMOVE ITEM");
      const removeItem = {
        pending: false,
        community: action.community
      };
      return removeItem;
    case Types.removeItemRejected:
      console.log("REJECTED ON REMOVE ITEM");
      const rejectedRemoveItem = {
        pending: false,
        community: Object.assign({}, state.community)
      };
      return rejectedRemoveItem;
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
