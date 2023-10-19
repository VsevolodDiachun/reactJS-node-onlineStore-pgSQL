/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Container, Row} from "react-bootstrap";
import {useEffect} from "react";
import {devicesFromBasket, fetchBrand} from "../http/deviceAPI";
import {useAction} from "../hooks/useAction";
import BasketList from "../components/BasketList";
import {useSelector} from "react-redux";
import { toast } from 'react-toastify';

const Basket = () => {
    const {isUserId} = useSelector(state => state.userReducer)
    const {ASetBasket, ASetBasketCount, ASetBrands, ASetRating, ASetRatingCount} = useAction()

    useEffect(() => {
        devicesFromBasket({id: isUserId})
            .then(data => {
                ASetBasket(data.devicesData);
                ASetBasketCount(data.countData)
                ASetRating(data.ratingByDevice)
                ASetRatingCount(data.ratingByCount)
            })
            .catch(() => toast.error("ERROR: fetch device from basket"))
        fetchBrand().then(data => ASetBrands(data))
            .catch(() => toast.error("ERROR: fetch brands"))
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