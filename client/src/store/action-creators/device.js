import {deviceActionEnum} from "../reducers/device/types";

export const deviceActionCreators = {
    ASetTypes: (payload) => ({type: deviceActionEnum.SET_TYPES, payload}),
    ASetBrands: (payload) => ({type: deviceActionEnum.SET_BRANDS, payload}),
    ASetDevices: (payload) => ({type: deviceActionEnum.SET_DEVICES, payload}),
    ASetBasket: (payload) => ({type: deviceActionEnum.SET_BASKET, payload}),
    ASetRating: (payload) => ({type: deviceActionEnum.SET_RATING, payload}),
    ASetBasketCount: (payload) => ({type: deviceActionEnum.SET_BASKET_COUNT, payload}),
    ASetSelectedType: (payload) => ({type: deviceActionEnum.SET_SELECTED_TYPE, payload}),
    ASetSelectedBrand: (payload) => ({type: deviceActionEnum.SET_SELECTED_BRAND, payload}),
    ASetPage: (payload) => ({type: deviceActionEnum.SET_PAGE, payload}),
    ASetTotalCount: (payload) => ({type: deviceActionEnum.SET_TOTAL_COUNT, payload}),
    ASetLimit: (payload) => ({type: deviceActionEnum.SET_LIMIT, payload}),
    ASetRatingCount: (payload) => ({type: deviceActionEnum.SET_RATING_COUNT, payload})
}