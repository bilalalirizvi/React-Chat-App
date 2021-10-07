const addAllUsers = (state = {}, action) => {
    switch (action.type) {
        case "ALL_USERS": {
            return { ...state, data: action.data };
        }
        default: {
            return state;
        }
    }
}

export default addAllUsers;