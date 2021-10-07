import { combineReducers } from "redux";
import addAllUsers from "./addAllUsers";
import addUser from './addUser'

const rootReducer = combineReducers({
  addUser,
  addAllUsers,
});

export default rootReducer;