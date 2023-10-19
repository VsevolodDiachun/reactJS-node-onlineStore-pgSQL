/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import star from '../assets/Star.png'
import basket from '../assets/basket.png'
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/consts";
import {useAction} from "../hooks/useAction";
import {useSelector} from "react-redux";
import {createBasketDevice, createOrUpdateRatingGoods, fetchDevice} from "../http/deviceAPI";
import { toast } from 'react-toastify';

const StarRating = ({ rating, onRatingChange }) => {
    const stars = Array.from({ length: 5 }, (_, index) => (
        <span
            key={index}
            className={`star ${index < rating ? 'filled' : ''}`}
            onClick={() => onRatingChange(index + 1)}
        >
      ★
    </span>
    ));

    return <div style={{marginLeft: 3}} className="star-rating">{stars}</div>;
};

const DeviceItem = (device) => {
    device = device.device
    const navigate = useNavigate()
    const {ASetBasketCount, ASetRating, ASetRatingCount} = useAction()
    const {isBasketCount, isBrands, isRating, isPage, isRatingCount, isSelectedType, isSelectedBrand, isLimit} = useSelector(state => state.deviceReducer)
    const {isUserId} = useSelector(state => state.userReducer)
    let brandData
    try {
        brandData = isBrands.filter(data => data.id === device.brandId)
    } catch (e) {}
    const [globalRating, setGlobalRating] = useState(0);
    const [rating, setRating] = useState(0);
    const [countGoodsInBasket, setCountGoodsInBasket] = useState(0);

        useEffect(() => {
            if (isUserId) {
                try {
                    const ratingGoodsCurrentUser = isRating.filter(data => data.userId === isUserId)
                    const ratingGoodsCurrentUserFiltered = ratingGoodsCurrentUser.filter(data => data.deviceId === device.id)
                    setRating(ratingGoodsCurrentUserFiltered[0].rate)
                } catch (e) {}
            }

            try {
                const ratingGoodsCurrentFiltered = isRating.filter(data => data.deviceId === device.id)
                const ratingCountFiltered = isRatingCount.filter(data => data.deviceId === device.id)
                let sumRate = 0
                let totalRate

                for (let i = 0; i < ratingGoodsCurrentFiltered.length; i++) {
                    sumRate += ratingGoodsCurrentFiltered[i].rate;
                }
                totalRate = sumRate / ratingCountFiltered[0].quantity
                const newTotalRate = totalRate.toFixed(1)
                setGlobalRating(newTotalRate)
            } catch (e) {}
        }, [isRating, isRatingCount])

    useEffect(() => {
        if (isUserId) {
            try {
                const devicesCount = isBasketCount.filter(data => data.deviceId === device.id)
                setCountGoodsInBasket(devicesCount[0].quantity)
            } catch (e) {}
        }
    }, [isBasketCount])

    const addInBasket = () => {
        createBasketDevice({id: isUserId, deviceId: device.id})
            .then(() => {
                fetchDevice(isSelectedType, isSelectedBrand, isPage, isLimit, isUserId)
                    .then(data => {
                        ASetBasketCount(data.countData)
                    })
            })
            .catch(() => toast.error("ERROR: add in basket"))
    }

    const handleRatingChange = (newRating) => {
        createOrUpdateRatingGoods({userId: isUserId, deviceId: device.id, rate: newRating === rating ? 0 : newRating})
            .then(() => {
                fetchDevice(isSelectedType, isSelectedBrand, isPage, isLimit, isUserId)
                    .then(data => {
                        ASetRating(data.ratingByDevice)
                        ASetRatingCount(data.ratingByCount)
                    })
            })
            .then(() => {setRating(0); setGlobalRating(0)})
            .catch(() => toast.error("ERROR: set rating"))
    }

    return (
        <Col
            className="mt-3 me-3"
            sm={4}
        >
            <Card style={{width: 150, cursor: "pointer",  padding: 10}}>
                <div onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
                    <div style={{height: 150, display: 'flex', justifyContent: 'center'}}>
                        <Image style={{maxWidth: 148, maxHeight:148}}  src={process.env.REACT_APP_API_URL + device.img}/>
                    </div>
                    <div className="mt-1 d-flex justify-content-between align-items-center">
                        <div>{brandData[0].name}</div>
                        <div className="d-flex align-items-center">
                            <div>{globalRating}</div>
                            <Image style={{width: 15, height: 15}} src={star}/>
                        </div>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div className="text-black-50">{device.name}</div>
                    </div>
                </div>
                {isUserId &&
                <StarRating
                    rating={rating}
                    onRatingChange={handleRatingChange}
                    style={{justifyContent: 'center'}}
                />}
            </Card>
            {isUserId && <Button
                style={{width: 150, height: 29, padding: 0, marginTop: 5}}
                variant={"outline-secondary"}
                onClick={() => addInBasket()}
            >
                <Image
                    style={{width: 22, height: 22}}
                    src={basket}
                />
                {countGoodsInBasket > 0 ? ` ${countGoodsInBasket}` : ''}
            </Button>}
        </Col>
    );
};

export default DeviceItem;