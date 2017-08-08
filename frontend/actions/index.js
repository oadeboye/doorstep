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

const editCommunity = (commEdits) => {
  return {
    type: 'EDIT_COMMUNITY',
    commEdits
  };
};

export { saveUser, editUser, editCommunity };
