import {SET_EMPLOYEES, SET_USER_DATA} from "./common";

export const actionEmployees = (employees) => {
    return {type: SET_EMPLOYEES, payload: employees}
};
export const actionUserData = (userData) => {
    return {type: SET_USER_DATA, payload: userData}
};
