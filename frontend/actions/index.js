const saveUser = (user) => {
  return {
    type: 'SAVE_USER',
    user,
  };
};

const editUser = (editObj) => {
  return {
    type: 'EDIT_USER',
    editObj
  };
};

export { saveUser, editUser };
