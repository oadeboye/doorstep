
const appReducer = (state = {}, action) => {
  switch(action.type) {
    case 'SAVE_USER':
      return action.user;
    case 'LOGOUT_USER':
      console.log("LOGOUT");
      return {};
    case 'persist/REHYDRATE':
      console.log("REHYDRATING ", action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default appReducer;
