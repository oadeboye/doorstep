const appReducer = (state = {}, action) => {
  switch(action.type) {
    case 'SAVE_USER':
      return action.user;
    case 'LOGOUT_USER':
      console.log("LOGOUT");
      return {};
    default:
      return state;
  }
};

export default appReducer;
