import React, {useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {useAction} from "../hooks/useAction";
import {devicesFromBasket, fetchAllRating, fetchBrand, fetchDevice, fetchTypes} from "../http/deviceAPI";
import Pages from "../components/Pages";
import {useSelector} from "react-redux";

const Shop = () => {
    const {ASetTypes, ASetBrands, ASetDevices, ASetTotalCount, ASetBasket, ASetBasketCount, ASetRating, ASetRatingCount} = useAction()
    const {isPage, isLimit, isSelectedType, isSelectedBrand, isBasket, isDevices, isRating} = useSelector(state => state.deviceReducer)
    const {isUserId} = useSelector(state => state.userReducer)

    useEffect(() => {
        fetchTypes().then(data => ASetTypes(data)).catch(e => console.log('errorA'))
        fetchBrand().then(data => ASetBrands(data)).catch(e => console.log('errorA'))
    }, [])

    // useEffect(() => {
    //     fetchAllRating({userId: 43})
    //         .then(data => ASetRating(data))
    //         .catch(() => 'error rating fetch')
    // }, [])

    useEffect(() => {
        fetchDevice(isSelectedType, isSelectedBrand, isPage, isLimit, isUserId)
            .then(data => {
                //console.log(data)
                ASetDevices(data.device.rows)
                ASetTotalCount(data.device.count)
                ASetBasketCount(data.countData)
                ASetRating(data.ratingByDevice)
                ASetRatingCount(data.ratingByCount)
            }).catch(e => console.log('errorA'))
    }, [isSelectedType, isSelectedBrand, isPage])

        //console.log(isDevices)
    //console.log(isRating)

    return (
        <Container>
            <Row className="mt-2">
                <Col md={2}>
                    <TypeBar />
                </Col>
                <Col md={10}>
                    <BrandBar />
                    <DeviceList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;