import React from 'react';
import {useSelector} from "react-redux";
import BasketItem from "./BasketItem";

const BasketList = () => {
    const {isBasket} = useSelector(state => state.deviceReducer)

    return (
        <div className="d-flex flex-wrap">
            {isBasket.map(basket =>
                <BasketItem key={basket.id} device={basket}/>
            )}
        </div>
    );
};

export default BasketList;