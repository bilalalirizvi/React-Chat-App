const addUser = (state = {}, action) => {
  // console.log("USER FROM REDUCER ===>", action.data);

  switch (action.type) {
    case "ADD_USER": {
      return { ...state, user: action.data };
    }
    case "REMOVE_USER": {
      return { ...state, user: action.data };
    }
    default: {
      return state;
    }
  }
};

export default addUser;
