const appReducer = (state = {}, action) => {
  switch(action.type) {
    case 'SAVE_USER':
      const currState = Object.assign({}, {
        fName: action.user.fName,
        lName: action.user.lName,
        email: action.user.email
      });
      return currState;
    case 'LOGOUT_USER':
      return {};
    case 'persist/REHYDRATE':
      return action.payload;
    default:
      return state;
  }
};

export default appReducer;
