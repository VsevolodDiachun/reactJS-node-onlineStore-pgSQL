import React from 'react';
import {Container, Row} from "react-bootstrap";
import {useEffect} from "react";
import {devicesFromBasket, fetchBrand} from "../http/deviceAPI";
import {useAction} from "../hooks/useAction";
import BasketList from "../components/BasketList";
import {useSelector} from "react-redux";

const Basket = () => {
    const {isUserId} = useSelector(state => state.userReducer)
    const {ASetBasket, ASetBasketCount, ASetBrands, ASetUserId, ASetRating, ASetRatingCount} = useAction()

    useEffect(() => {
        devicesFromBasket({id: isUserId})
            .then(data => {
                ASetBasket(data.devicesData);
                ASetBasketCount(data.countData)
                ASetRating(data.ratingByDevice)
                ASetRatingCount(data.ratingByCount)
            })
            .catch(e => console.log('errorA'))
        fetchBrand().then(data => ASetBrands(data))
            .catch(e => console.log('errorA'))
    }, [isUserId])

    return (
        <Container>
            <Row className="mt-2">
                <BasketList />
            </Row>
        </Container>
    );
};

export default Basket;