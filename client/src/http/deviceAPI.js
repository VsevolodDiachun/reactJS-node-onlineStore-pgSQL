import {$authHost, $host} from "./index";

//TYPES

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

//BRANDS

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrand = async () => {
    const {data} = await $host.get('api/brand')
    return data
}

//DEVICE

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}

export const fetchDevice = async (typeId, brandId, page, limit, isUserId) => {
    const {data} = await $host.get('api/device', {params: {
            typeId, brandId, page, limit, userId: isUserId
        }})
    return data
}

export const fetchAllDevice = async () => {
    const {data} = await $host.get('api/device/getall')
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}

//BASKET_DEVICES

export const devicesFromBasket = async (basket) => {
    const {data} = await $host.post('api/basketdevices/all', basket)
    return data
}

export const countDeviceFromBasket = async (count) => {
    const {data} = await $host.post('api/basketdevices/one', count)
    return data
}

export const deleteSelectDevice = async (basket) => {
    const {data} = await $host.post('api/basketdevices/destroy', basket)
    return data
}

export const createBasketDevice = async (basketDevice) => {
    const {data} = await $host.post('api/basketdevices', basketDevice)
    return data
}

// RATING

export const createOrUpdateRatingGoods = async (ratingGoods) => {
    const {data} = await $host.post('api/rating', ratingGoods)
    return data
}

export const fetchAllRating = async (rating) => {
    const {data} = await $host.post('api/rating/all', rating)
    return data
}

export const fetchOneGlobalRating = async (rating) => {
    const {data} = await $host.post('api/rating/oneglobal', rating)
    return data
}