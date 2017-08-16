import Types from '../actions/actionTypes';

const itemReducer = (state = {pending: true, item: {}}, action) => {
  switch(action.type) {
    case Types.itemStatusChangeRequested:
      const pendingState = {
        pending: true,
        item: {}
      };
      return pendingState;
    case Types.itemStatusChangeFulfilled:
      const fulfilledState = {
        pending: false,
        item: action.item
      };
      return fulfilledState;
    case Types.itemStatusChangeRejected:
      const rejectedState = {
        pending: false,
        error: action.error
      };
      return rejectedState;
    default:
      return state;
  }
};

export default itemReducer;
