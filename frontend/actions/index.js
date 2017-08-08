const saveUser = (user) => {
  return {
    type: 'SAVE_USER',
    user,
  };
};

const editUser = (edits) => {
  return {
    type: 'EDIT_USER',
    edits
  };
};

export { saveUser, editUser };
