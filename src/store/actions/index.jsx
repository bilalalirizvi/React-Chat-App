const storeUser = (user) => {
  // console.log("USER FROM ACTION ===>", user);

  return {
    type: "ADD_USERS",
    data: user,
  };
};

const removeUser = () => {
  return {
    type: "REMOVE_USER",
  };
};

const storeAllUsers = (users) => {
  return {
    type: "ALL_USERS",
    data: users,
  };
};

export { storeUser, removeUser, storeAllUsers };
