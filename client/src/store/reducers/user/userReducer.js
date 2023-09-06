import {userActionEnum} from "./types";

const initialState = {
    isAuth: false,
    isEmail: '',
    isUser: {},
    isUserId: null,
    isRole: '',
}

export const userReducer = (state = initialState, action) => {
    switch (action.type){
        case userActionEnum.SET_AUTH:
            return {...state, isAuth: action.payload};
        case userActionEnum.SET_USER:
            return {...state, isUser: action.payload};
        case userActionEnum.SET_EMAIL:
            return {...state, isEmail: action.payload};
        case userActionEnum.SET_USER_ID:
            return {...state, isUserId: action.payload};
        case userActionEnum.SET_ROLE:
            return  {...state, isRole: action.payload};
        default:
            return state;
    }
}