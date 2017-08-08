const userReducer = (state = {}, action) => {
  switch(action.type) {
    case 'SAVE_USER':
      return action.user;
    case 'LOGOUT_USER':
      return {};
    case 'persist/REHYDRATE':
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
