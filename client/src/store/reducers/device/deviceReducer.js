import {deviceActionEnum} from "./types";

const initialState = {
    isTypes: [],
    isBrands: [],
    isDevices: [],
    isBasket: [],
    isBasketCount: [],
    isSelectedType: {},
    isSelectedBrand: {},
    isPage: 1,
    isTotalCount: 0,
    isLimit: 4,
    isRating: [],
    isRatingCount: []
}

export const deviceReducer = (state = initialState, action) => {
    switch (action.type){
        case deviceActionEnum.SET_TYPES:
            return {...state, isTypes: action.payload};
        case deviceActionEnum.SET_BRANDS:
            return {...state, isBrands: action.payload};
        case deviceActionEnum.SET_DEVICES:
            return {...state, isDevices: action.payload};
        case deviceActionEnum.SET_BASKET:
            return {...state, isBasket: action.payload};
        case deviceActionEnum.SET_BASKET_COUNT:
            return {...state, isBasketCount: action.payload};
        case deviceActionEnum.SET_SELECTED_TYPE:
            return {...state, isPage: 1, isSelectedType: action.payload};
        case deviceActionEnum.SET_RATING:
            return {...state, isRating: action.payload};
        case deviceActionEnum.SET_SELECTED_BRAND:
            return {...state, isPage: 1, isSelectedBrand: action.payload};
        case deviceActionEnum.SET_PAGE:
            return {...state, isPage: action.payload};
        case deviceActionEnum.SET_TOTAL_COUNT:
            return {...state, isTotalCount: action.payload};
        case deviceActionEnum.SET_LIMIT:
            return {...state, isLimit: action.payload};
        case deviceActionEnum.SET_RATING_COUNT:
            return {...state, isRatingCount: action.payload};
        default:
            return state;
    }
}