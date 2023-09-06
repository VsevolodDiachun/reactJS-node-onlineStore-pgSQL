const uuid = require('uuid')
const path = require("path");
const fs = require('fs');
const {Device, DeviceInfo, Basket, Rating, BasketDevice} = require("../DataBase/models");
const ApiError = require("../error/ApiError");
const {Sequelize} = require("sequelize");

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let filename = uuid.v4() + '.jpg'
            await img.mv(path.resolve(__dirname, '..', 'static', filename))

            const device = await Device.create({name, price, brandId, typeId, img: filename})

            if (info) {
                info = JSON.parse(info)
                info.forEach(i => {
                    DeviceInfo.create({title: i.title, description: i.description, deviceId: device.id})
                })
            }

            return res.json(device)
        } catch (e) {
            return next(e)
        }
    }

    async getAllUnLimit(req, res, next) {
        await Device.findAll({where: {id: [4, 5]}})
            .then((baskets) => res.json(baskets))
            .catch((e) => next(e))
    }

    async getAllFromDeviceToBasketDevices(req, res, next) {
        const {id} = req.body
        await Device.findAll({where: {id}})
            .then((deviceFromBaskets) => res.json(deviceFromBaskets))
            .catch((e) => next(e))
    }

    async getAll(req, res, next) {
        try {
            let {brandId, typeId, limit, page, userId} = req.query
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit

            let device
            let ratingByDevice
            let ratingByCount
            const findRatingByDevices = async (data) => {
                device = data
                const result = data.rows.map(item => item.id)
                await Rating.findAll({where: {deviceId: result}})
                    .then(data => ratingByDevice = data)
                    .then(() => Rating.findAll(
                        {attributes:
                                ['deviceId',
                                    [Sequelize.fn('COUNT', Sequelize.col('deviceId')),
                                        'quantity'],
                                ],
                            where: { deviceId: result },
                            group: ['deviceId'],}))
                        .then(data => ratingByCount = data)
                return 0
            }

            if (!brandId && !typeId) {
                await Device.findAndCountAll({limit, offset})
                    .then(data => findRatingByDevices(data))
            }
            if (brandId && !typeId) {
                await Device.findAndCountAll({where: {brandId}, limit, offset})
                    .then(data => findRatingByDevices(data))
            }
            if (!brandId && typeId) {
                await Device.findAndCountAll({where: {typeId}, limit, offset})
                    .then(data => findRatingByDevices(data))
            }
            if (brandId && typeId) {
                await Device.findAndCountAll({where: {brandId, typeId}, limit, offset})
                    .then(data => findRatingByDevices(data))
            }


            let countData = []

            const deviceItem = device.rows.map(item => item.id)

            if (userId) {
                let basId = 0
                await Basket.findOne({where: {userId}})
                    .then(data => basId = data.id)
                    .then(data => BasketDevice.findAll({where: {basketId: data, deviceId: deviceItem}}))
                    .then(data => data.map(item => item.deviceId))
                    .then(arrIdDevice => BasketDevice.findAll(
                        {attributes:
                                ['deviceId',
                                    [Sequelize.fn('COUNT', Sequelize.col('deviceId')),
                                        'quantity'],
                                ],
                            where: { deviceId: arrIdDevice, basketId: basId },
                            group: ['deviceId'],}))
                    .then(data => countData = data)
                    .catch(e => next(ApiError.badRequest("BasketDevice помилка пошуку")))
            }


            return res.json({device, ratingByDevice, ratingByCount, countData})
        } catch (e) {
            return next(ApiError.badRequest(e))
        }
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne({where: {id}, include: [{model: DeviceInfo, as: 'info'}]})

        return res.json(device)
    }

    async destroy(req, res, next) { //dev
        try {
            const {id} = req.params
            const deviceName = await Device.findOne({where: {id}})

            const filename = deviceName.img;
            const filePath = path.resolve(__dirname, '..', 'static', filename);

            await fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error deleting file');
                }
            });

            const device = await Device.destroy({where: {id}})
            return res.json({message: device ? `Запис '${deviceName.name}' з таблиці видалено. Зображення ` : "Помилка, поля з таким імʼям не існує."})
        } catch (e) {
            return next(ApiError.badRequest('Помилочка, не правильна назва обʼєкту :c'))
        }
    }
}

module.exports = new DeviceController()