import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from '../assets/bigStar.png'
import {useParams} from "react-router";
import {
    countDeviceFromBasket,
    createBasketDevice,
    createOrUpdateRatingGoods,
    fetchOneDevice,
    fetchOneGlobalRating
} from "../http/deviceAPI";
import {useSelector} from "react-redux";
import {useAction} from "../hooks/useAction";

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

const DevicePage = () => {
    const [device, setDevice] = useState({info: []})
    const [fetchRating, setFetchRating] = useState([])
    const [fetchRatingCount, setFetchRatingCount] = useState([])
    const [middleRating, setMiddleRating] = useState(0)
    const [personalRating, setPersonalRating] = useState(0)
    const {isUserId} = useSelector(state => state.userReducer)
    const {isBasketCount} = useSelector(state => state.deviceReducer)
    const {ASetBasketCount} = useAction()
    const {id} = useParams()

    const addInBasket = () => {
        createBasketDevice({id: isUserId, deviceId: device.id})
            .then(() => countDeviceFromBasket({userId: isUserId, deviceId: device.id}))
            .then(data => {ASetBasketCount(data[0].quantity)})
            .catch(() => console.log('error'))
    }

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])

    useEffect(() => {
        if (isUserId) {
            countDeviceFromBasket({userId: isUserId, deviceId: id})
                .then(data => { ASetBasketCount(data[0].quantity) })
                .catch(() => console.log('error'))
        }
    }, [isUserId])

    useEffect(() => {
        fetchOneGlobalRating({deviceId: id})
            .then(data => {
                //console.log(data)
                setFetchRating(data.ratingOneGlobal)
                setFetchRatingCount(data.ratingCount)
            })
    }, [id])

    useEffect(() => {
        try {
            let sumRate = 0
            let totalRate

            for (let i = 0; i < fetchRating.length; i++) {
                sumRate += fetchRating[i].rate;
            }
            totalRate = sumRate / fetchRatingCount[0].quantity
            totalRate.toFixed(1)

            setMiddleRating(totalRate.toFixed(1))
            const userRating = fetchRating.filter(data => data.userId === isUserId)
            setPersonalRating(userRating[0].rate)
        } catch (e) {}
    }, [personalRating, middleRating, fetchRating, fetchRatingCount])


    const handleRatingChange = (newRating) => {
        createOrUpdateRatingGoods({userId: isUserId, deviceId: id, rate: newRating === personalRating ? 0 : newRating})
            .then(() => {
                fetchOneGlobalRating({deviceId: id})
                    .then(data => {
                        setPersonalRating(0)
                        setMiddleRating(0)
                        setFetchRating(data.ratingOneGlobal)
                        setFetchRatingCount(data.ratingCount)
                    })
            })
            // .then(() => {setPersonalRating(0); setMiddleRating(0)})
            .catch(() => console.log('error'))
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <div style={{height: 300, display: 'flex', justifyContent: 'center'}}>
                        <Image style={{maxWidth: 300, maxHeight:300}}  src={process.env.REACT_APP_API_URL + device.img}/>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64}}
                        >
                            {middleRating}
                        </div>
                    </div>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height:300, fontSize: 32, border: '5px solid lightgray', borderRadius: 30}}
                    >
                        <h3>Від: {device.price}$</h3>
                        {isUserId &&
                            <StarRating
                                rating={personalRating}
                                onRatingChange={handleRatingChange}
                                style={{justifyContent: 'center'}}
                            />}
                        {isUserId && <Button
                            variant={"outline-dark"}
                            onClick={() => addInBasket()}
                        >
                            Добавити в корзину {isBasketCount > 0 ? `x${isBasketCount}` : ''}
                        </Button>}
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;









// useEffect(() => {
//     try {
//         let sumRate = 0
//         let totalRate
//
//         for (let i = 0; i < isRating.length; i++) {
//             sumRate += isRating[i].rate;
//         }
//         totalRate = sumRate / isRatingCount[0].quantity
//         totalRate.toFixed(1)
//
//         setMiddleRating(totalRate)
//         const userRating = isRating.filter(data => data.userId === isUserId)
//         setPersonalRating(userRating[0].rate)
//     } catch (e) {}
// }, [isRating, isRatingCount, personalRating, middleRating])















// import React, {useEffect, useState} from 'react';
// import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
// import bigStar from '../assets/bigStar.png'
// import {useParams} from "react-router";
// import {countDeviceFromBasket, createBasketDevice, fetchOneDevice} from "../http/deviceAPI";
// import {useSelector} from "react-redux";
// import {useAction} from "../hooks/useAction";
//
// const DevicePage = () => {
//     const [device, setDevice] = useState({info: []})
//     const {isUserId} = useSelector(state => state.userReducer)
//     const {isBasketCount} = useSelector(state => state.deviceReducer)
//     const {ASetBasketCount} = useAction()
//     const {id} = useParams()
//
//     const addInBasket = () => {
//         createBasketDevice({id: isUserId, deviceId: device.id})
//             .then(() => countDeviceFromBasket({userId: isUserId, deviceId: device.id}))
//             .then(data => {ASetBasketCount(data[0].quantity)})
//
//             .catch(() => console.log('error'))
//     }
//     //console.log(isBasketCount)
//
//     useEffect(() => {
//         fetchOneDevice(id).then(data => setDevice(data))
//     }, [])
//
//     useEffect(() => {
//         if (isUserId) {
//             countDeviceFromBasket({userId: isUserId, deviceId: id})
//                 .then(data => { if (![]) {ASetBasketCount(data[0].quantity)} })
//                 .catch(() => console.log('error'))
//         }
//     }, [isBasketCount])
//     //console.log(device)
//
//     return (
//         <Container className="mt-3">
//             <Row>
//                 <Col md={4}>
//                     <div style={{height: 300, display: 'flex', justifyContent: 'center'}}>
//                         <Image style={{maxWidth: 300, maxHeight:300}}  src={process.env.REACT_APP_API_URL + device.img}/>
//                     </div>
//                 </Col>
//                 <Col md={4}>
//                     <div className="d-flex flex-column align-items-center">
//                         <h2>{device.name}</h2>
//                         <div
//                             className="d-flex align-items-center justify-content-center"
//                             style={{background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64}}
//                         >
//                             {device.rating}
//                         </div>
//                     </div>
//                 </Col>
//                 <Col md={4}>
//                     <Card
//                         className="d-flex flex-column align-items-center justify-content-around"
//                         style={{width: 300, height:300, fontSize: 32, border: '5px solid lightgray', borderRadius: 30}}
//                     >
//                         <h3>Від: {device.price}$</h3>
//                         {isUserId && <Button
//                             variant={"outline-dark"}
//                             onClick={() => addInBasket()}
//                         >
//                             Добавити в корзину {isBasketCount > 0 ? `x${isBasketCount}` : ''}
//                         </Button>}
//                     </Card>
//                 </Col>
//             </Row>
//             <Row className="d-flex flex-column m-3">
//                 <h1>Характеристики</h1>
//                 {device.info.map((info, index) =>
//                     <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
//                         {info.title}: {info.description}
//                     </Row>
//                 )}
//             </Row>
//         </Container>
//     );
// };
//
// export default DevicePage;