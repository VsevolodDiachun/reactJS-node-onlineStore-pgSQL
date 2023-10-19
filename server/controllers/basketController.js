const {Basket, BasketDevice} = require("../DataBase/models");
const ApiError = require("../error/ApiError");

class BasketController {
    async create(req, res, next) {
        const {basketId, deviceId} = req.body
        await BasketDevice.create({basketId, deviceId})
            .then(() => res.json({message: 'id присвоїно'}))
            .catch(() => next(ApiError.badRequest('BasketControllerDevice ERROR')))
    }

    async getAll(req, res, next) {
        const {userId} = req.body
        await Basket.findOne({where: userId})
            .then((baskets) => res.json(baskets))
            .catch((e) => next(e))
    }

    async destroy(req, res, next) {
        const {id} = req.params
        let name = ''
        await Basket.findOne({where: {id}})
            .then((basket) => {name = basket.id; basket.destroy()})
            .then(() => res.status(200).json({message: `Запис '${name}' видалено`}))
            .catch(() => next(ApiError.internal("Помилка, поля з таким Basket не існує.")))
    }
}

module.exports = new BasketController()