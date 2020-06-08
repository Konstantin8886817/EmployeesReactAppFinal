import {SET_EMPLOYEES, SET_USER_DATA} from "./common";
import {combineReducers} from "redux";
const reducerEmployees = (state = [], action) => {
    return action.type === SET_EMPLOYEES ? action.payload.slice(0) : state;
};
const reducerUserData = (state = {}, action) => {
    return action.type === SET_USER_DATA ? {...action.payload} : state;
};
export default combineReducers({
    employees: reducerEmployees,
    userData: reducerUserData
})
