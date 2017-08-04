const saveUser = (user) => {
  return {
    type: 'SAVE_USER',
    user,
  };
};

export default saveUser;
