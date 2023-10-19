const {Rating} = require("../DataBase/models");
const ApiError = require("../error/ApiError");
const {Sequelize} = require("sequelize");

class ratingController {
    async create(req, res, next) {
        try {
            const {userId, rate, deviceId} = req.body
            const checkRating = await Rating.findOne({where: {userId, deviceId}})
                .catch(e => res.json(userId, rate, deviceId))
            if (rate === 0) {
                await Rating.destroy({where: {userId, deviceId}})
                    .then(data => res.json(data))
            } else {
                if (checkRating) {
                    await checkRating.update({rate})
                        .then(data => res.json(data))
                        .catch(e => res.json('Rating error2'))
                } else {
                    await Rating.create({userId, rate, deviceId})
                        .then(data => res.json(data))
                        .catch(e => res.json('Rating error3'))
                }
            }
        } catch (e) {
            console.log("Rating create error")
        }
    }

    async getOne(req, res, next) {
        const {userId, deviceId} = req.body

        await Rating.findOne({where: {userId, deviceId}})
            .then(data => res.json(data))
            .catch(() => res.json('error'))
    }

    async getOneGlobal(req, res, next) {
        const {deviceId} = req.body
        let ratingOneGlobal
        await Rating.findAll({where: {deviceId}})
            .then(data => ratingOneGlobal = data)
            .then(data => data.map(item => item.deviceId))
            .then(data => Rating.findAll(
                {attributes:
                        ['deviceId',
                            [Sequelize.fn('COUNT', Sequelize.col('deviceId')),
                                'quantity'],
                        ],
                    where: { deviceId: data },
                    group: ['deviceId']}))
            .then(ratingCount => res.json({ratingOneGlobal, ratingCount}))
            .catch(() => res.json('error'))
    }

    async getAll(req, res, next) {
        try {
            const {userId} = req.body
            let ratingData
            await Rating.findAll()
                .then(data => ratingData = data)
                .then(data => data.map(item => item.deviceId))
                .then(data => Rating.findAll(
                    {attributes:
                            ['deviceId',
                                [Sequelize.fn('COUNT', Sequelize.col('deviceId')),
                                    'quantity'],
                            ],
                        where: { deviceId: data },
                        group: ['deviceId'],}))
                .then(data => res.json([ratingData, data]))
                .catch(() => res.json('error'))
        } catch (e) {res.json('помилка')}
    }

    async destroy(req, res, next) {
        const {id} = req.params

        await Rating.destroy({where: {id}})
            .then(() => res.json(`Рядок ${id} успішно видалено`))
            .catch(() => next(ApiError.internal("Помилка, поля з таким id не існує.")))
    }
}

module.exports = new ratingController()