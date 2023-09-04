import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Card, Col, Image} from "react-bootstrap";
import {DEVICE_ROUTE} from "../utils/consts";
import star from "../assets/Star.png";
import {useSelector} from "react-redux";
import {createBasketDevice, deleteSelectDevice, devicesFromBasket} from "../http/deviceAPI";
import {useAction} from "../hooks/useAction";
import basketIcon from '../assets/basket.png'

const BasketItem = (basket) => {
    basket = basket.device
    const {isBasketCount, isBrands, isRating, isRatingCount} = useSelector(data => data.deviceReducer)
    const {isUserId} = useSelector(data => data.userReducer)
    const {ASetBasket, ASetBasketCount} = useAction()
    const navigate = useNavigate()
    //console.log(basket)
    //console.log(isBasketCount)

    const [basketCount, setBasketCount] = useState('0')
    const [globalRating, setGlobalRating] = useState(0);
    const [rating, setRating] = useState(0);
    const [countGoodsInBasket, setCountGoodsInBasket] = useState(0);
    useEffect(() => {
        try {
            const devicesCount = isBasketCount.filter(data => data.deviceId === basket.id)
            setBasketCount(devicesCount[0].quantity)
        } catch (e) {}
    }, [isBasketCount])
        //const devicesCount = isBasketCount.filter(data => data.deviceId === basket.id)
        const brandData = isBrands.filter(data => data.id === basket.brandId)


    useEffect(() => {
        if (isUserId) {
            try { //auth
                const ratingGoodsCurrentUser = isRating.filter(data => data.userId === isUserId)
                const ratingGoodsCurrentUserFiltered = ratingGoodsCurrentUser.filter(data => data.deviceId === basket.id)
                setRating(ratingGoodsCurrentUserFiltered[0].rate)
            } catch (e) {
            }

        }
        try {
            const ratingGoodsCurrentFiltered = isRating.filter(data => data.deviceId === basket.id)
            const ratingCountFiltered = isRatingCount.filter(data => data.deviceId === basket.id)
            let sumRate = 0
            let totalRate

            for (let i = 0; i < ratingGoodsCurrentFiltered.length; i++) {
                sumRate += ratingGoodsCurrentFiltered[i].rate;
            }
            totalRate = sumRate / ratingCountFiltered[0].quantity
            const newTotalRate = totalRate.toFixed(1)

            setGlobalRating(newTotalRate)
        } catch (e) {
        }
    }, [isRating, isRatingCount])



    //console.log(brandData)

    //console.log(isBrands)
    const delDevice = () => {
        deleteSelectDevice({deviceId: basket.id, userId: isUserId})
            .then(data => console.log(data))
            .then(() => devicesFromBasket({id: isUserId}))
            .then(data => {ASetBasket(data.devicesData); ASetBasketCount(data.countData)})
            .catch(() => console.log('errorA'))
    }

    const addInBasket = () => {
        createBasketDevice({id: isUserId, deviceId: basket.id})
            .then(data => console.log(data))
            .then(() => devicesFromBasket({id: isUserId}))
            .then(data => {ASetBasket(data.devicesData); ASetBasketCount(data.countData)})
            .catch(() => console.log('error'))
    }

    const minusOrDelete = () => {if (basketCount > 1) {
        return 'Мінуснути'
    }else {
        return 'Видалити'
    }}

    return (
        <Col className="mt-3 me-3"
             // sm={4} md={4}
            lg={2}
        >
            <Card style={{width: 150, cursor: "pointer"}} border={"light"} onClick={() => navigate(DEVICE_ROUTE + '/' + basket.id)}>
                <div style={{height: 150, display: 'flex', justifyContent: 'center'}}>
                    <Image style={{maxWidth: 150, maxHeight:150}}  src={process.env.REACT_APP_API_URL + basket.img}/>
                </div>
                <div className="mt-1 d-flex justify-content-between align-items-center">
                    <div>{brandData[0].name}</div>
                    <div className="d-flex align-items-center">
                        <div>{globalRating}</div>
                        <Image style={{width: 15, height: 15}} src={star}/>
                    </div>
                </div>
                <div
                    style={{display: "flex", justifyContent: "space-between"}}
                >
                    <div className="text-black-50">{basket.name}</div>
                    <div style={{color: "blue"}}>x{basketCount}</div>
                </div>
            </Card>
            <div style={{display: "flex", flexDirection: "row"}}>
                <Button
                    style={{width: 107, marginRight: 5}}
                    variant={"outline-danger"}
                    onClick={() => delDevice()}
                >
                    {minusOrDelete()}
                </Button>
                <Button
                    style={{width: 38, padding: 6}}
                    variant={"outline-secondary"}
                    onClick={() => addInBasket()}
                >
                    <Image
                        style={{width: 22, height: 22}}
                        src={basketIcon}
                    />
                </Button>
            </div>
        </Col >
    );
};

export default BasketItem;