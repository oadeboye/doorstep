const appReducer = (state = {}, action) => {
  switch(action.type) {
    case 'SAVE_USER':
      return action.user;
    case 'LOGOUT_USER':
      return {};
    case 'EDIT_USER':
      const currState = Object.assign({}, state, {
        fName: action.edits.fName,
        lName: action.edits.lName,
        email: action.edits.email
      });
      return currState;
    case 'persist/REHYDRATE':
      return action.payload;
    default:
      return state;
  }
};

export default appReducer;
