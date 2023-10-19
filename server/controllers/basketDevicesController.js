const {BasketDevice, Basket, Device, Rating} = require("../DataBase/models");
const ApiError = require("../error/ApiError");
const {Sequelize} = require('sequelize');

class BasketDevicesController {
    async create(req, res, next) {
        const {id, deviceId} = req.body
        await Basket.findOne({where: {userId: id}})
            .then(data => BasketDevice.create({basketId: data.id, deviceId}))
            .then((data) => res.json(data))
            .catch(e => next(ApiError.badRequest('BasketControllerDevice ERROR')))
    }

    async getAll(req, res, next) {
        const {basketId} = req.body
        await BasketDevice.findAll({where: basketId})
            .then(basket => res.json(basket))
            .catch(e => next(ApiError.badRequest("BasketDevice помилка пошуку")))
    }

    async getAllDevicesFromBasket(req, res, next) {
        const {id} = req.body
        let devicesData = {}
        let basketData = {}
        let countData = {}
        let basId = 0
        await Basket.findOne({where: {userId: id}})
            .then(data => basId = data.id)
            .then(data => BasketDevice.findAll({where: {basketId: data}}))
            .then(basket => basket.map(item => item.deviceId))
            .then(data => basketData = data)
            .then(arrIdDevice => Device.findAll({where: { id: arrIdDevice }}))
            .then(data => devicesData = data)
            .catch(e => next(ApiError.badRequest("BasketDevice помилка пошуку")))

        new Promise((resolve) => {resolve(basketData)})
            .then(arrIdDevice => BasketDevice.findAll(
                {attributes:
                        ['deviceId',
                            [Sequelize.fn('COUNT', Sequelize.col('deviceId')),
                                'quantity'],
                        ],
                    where: { deviceId: arrIdDevice, basketId: basId },
                    group: ['deviceId'],}))
            .then(data => countData = data)
            .then(data => data.map(item => item.deviceId))
            .then(data => {
                devicesData.sort((a, b) => {
                    const indexA = data.indexOf(a.id);
                    const indexB = data.indexOf(b.id);
                    return indexA - indexB
                })
            })
            .catch(e => next(ApiError.badRequest("BasketDevice помилка пошуку")))

        let ratingByDevice
        let ratingByCount

        new Promise((resolve) => {resolve(basketData)})
            .then(data => Rating.findAll({where: {deviceId: data}}))
            .then(data => ratingByDevice = data)
            .then(() => Rating.findAll(
                {attributes:
                        ['deviceId',
                            [Sequelize.fn('COUNT', Sequelize.col('deviceId')),
                                'quantity'],
                        ],
                    where: { deviceId: basketData },
                    group: ['deviceId']}))
            .then(data => ratingByCount = data)
            .then(() => res.json({devicesData, countData, ratingByDevice, ratingByCount}))
            .catch(() => next(ApiError.badRequest("BasketDevice помилка пошуку")))
    }

    async getOneDFB(req, res, next) {
        const {userId, deviceId} = req.body
        let basId = 0

        await Basket.findOne({where: {userId}})
            .then(data => basId = data.id)
            .then(data => BasketDevice.findAll({where: {basketId: data, deviceId}}))
            .then(data => data.map(item => item.deviceId))
            .then(arrIdDevice => BasketDevice.findAll(
                {attributes:
                        ['deviceId',
                            [Sequelize.fn('COUNT', Sequelize.col('deviceId')),
                                'quantity'],
                        ],
                    where: { deviceId: arrIdDevice, basketId: basId },
                    group: ['deviceId'],}))
            .then(countData => res.json(countData))
            .catch(() => next(ApiError.badRequest("BasketDevice помилка пошуку")))
    }

    async allData(req, res, next) {
        const {id} = req.body
        let basId = 0

        await Basket.findOne({where: {userId: id}})
            .then(data => basId = data.id)
            .then(data => BasketDevice.findAll({where: {basketId: data}}))
            .then(data => data.map(item => item.deviceId))
            .then(data => res.json(data))
            .then(() => BasketDevice.findAll({where: {basketId: basId }}))
            .then(arrIdDevice => BasketDevice.findAll(
                {attributes:
                        ['deviceId',
                            [Sequelize.fn('COUNT', Sequelize.col('deviceId')),
                                'quantity'],
                        ],
                    where: { deviceId: arrIdDevice, basketId: basId },
                    group: ['deviceId'],}))
            .then(countData => res.json(countData))
            .then(data => res.json(data))
            .catch(e => next(ApiError.badRequest("BasketDevice помилка пошуку")))
    }

    async count(req, res, next) {
        const {id} = req.body
        await Basket.findOne({where: {userId: id}})
            .then(basket => BasketDevice.findAll({where: basket.basketId}))
            .then(basket => basket.map(item => item.deviceId))
            .then(arrIdDevice => BasketDevice.findAll(
                {attributes:
                        ['deviceId',
                            [Sequelize.fn('COUNT', Sequelize.col('deviceId')),
                                'quantity'],
                        ],
                where: { deviceId: arrIdDevice },
                group: ['deviceId'],}))
            .then(data => res.json(data))
    }

    async destroy(req, res, next) {
        const {userId, deviceId} = req.body
        let name = ''

        await Basket.findOne({where: {userId}})
            .then(data => BasketDevice.findOne({where: {basketId: data.id, deviceId}}))
            .then((basketdevice) => {name = basketdevice.id; basketdevice.destroy()})
            .then(() => res.status(200).json({message: `Запис '${name}' видалено`}))
            .catch((e) => next(ApiError.internal("Помилка, поля з таким Basket не існує.")))
    }
}

module.exports = new BasketDevicesController()