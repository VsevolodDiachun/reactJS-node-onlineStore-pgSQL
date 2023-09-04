import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import DeviceItem from "./DeviceItem";
import BasketItem from "./BasketItem";
import {devicesFromBasket, fetchBrand} from "../http/deviceAPI";
import {useAction} from "../hooks/useAction";

const BasketList = () => {
    const {isBasket} = useSelector(state => state.deviceReducer)
    const {isUserId} = useSelector(state => state.userReducer)
    const {ASetBrands, ASetBasket, ASetBasketCount} = useAction()



    //console.log(isBasket)

    return (
        <div className="d-flex flex-wrap">
            {isBasket.map(basket =>
                <BasketItem key={basket.id} device={basket}/>
            )}
        </div>
    );
};

export default BasketList;