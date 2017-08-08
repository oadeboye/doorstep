import Types from '../actions/actions'

const allCommunitiesReducer = (state = {pending: false, data: []}, action) => {
  switch(action.type) {
    case Types.getAllCommunitiesRequested:
      const newState = {
        pending: true,
        data: []
      }
      return newState;
    case Types.getAllCommunitiesFulfilled:
      const newState = {
        pending: false,
        data: action.data
      }
      return state;
    case Types.getAllCommunitiesRejected:
      const newState = {
        pending: false,
        error: action.error
      }
      return state;
    default:
      return state;
  }
};

export default allCommunitiesReducer;
