import Types from '../actions/actionTypes';

const oneCommunityReducer = (state = {pending: false, community: {}}, action) => {
  switch(action.type) {
    case Types.getOneCommunityRequested:
      // console.log('PENDING');
      const pendingState = {
        pending: true,
        community: []
      };
      return pendingState;
    case Types.getOneCommunityFulfilled:
      const fulfilledState = {
        pending: false,
        community: Object.assign({}, action.community)
      };
      // console.log('FULFILLED', fulfilledState);
      return fulfilledState;
    case Types.getOneCommunityRejected:
      const rejectedState = {
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
    default:
      return state;
  }
};

export default oneCommunityReducer;
