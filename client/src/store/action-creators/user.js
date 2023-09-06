import {userActionEnum} from "../reducers/user/types";

export const userActionCreators = {
    ASetAuth: (payload) => ({type: userActionEnum.SET_AUTH, payload}),
    ASetUser: (payload) => ({type: userActionEnum.SET_USER, payload}),
    ASetEmail: (payload) => ({type: userActionEnum.SET_EMAIL, payload}),
    ASetUserId: (payload) => ({type: userActionEnum.SET_USER_ID, payload}),
    ASetRole: (payload) => ({type: userActionEnum.SET_ROLE, payload})
}