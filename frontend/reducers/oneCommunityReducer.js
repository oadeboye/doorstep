import Types from '../actions/actionTypes';
import axios from 'axios';

const oneCommunityReducer = (state = {pending: false, community: {}}, action) => {
  switch(action.type) {
    case Types.getOneCommunityRequested:
      console.log('PENDING');
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
      console.log('FULFILLED', fulfilledState);
      return fulfilledState;
    case Types.getOneCommunityRejected:
      const rejectedState = {
        pending: false,
        error: action.error
      };
      console.log('REJECTED', rejectedState);
      return rejectedState;
    default:
      return state;
  }
};

export default oneCommunityReducer;
