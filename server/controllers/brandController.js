const {Brand} = require("../DataBase/models");
const ApiError = require("../error/ApiError");

class BrandController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const brands = await Brand.create({name})
            return res.json(brands)
        } catch (e) {
            return next(ApiError.badRequest('Помилка'))
        }
    }

    async getAll(req, res) {
        const brand = await Brand.findAll()
        return res.json(brand)
    }

    async destroy(req, res, next) { //dev
        try {
            const {name} = req.params
            const brandName = await Brand.findOne({where: {id}})
            const brands = await Brand.destroy({where: {name}})
            return res.json({message: brands ? `Запис '${brandName.name}' з таблиці видалено.` : "Помилка, поля з таким імʼям не існує."})
        } catch (e) {
            return next(ApiError.badRequest('Помилочка, не правильна назва обʼєкту :c'))
        }
    }
}

module.exports = new BrandController()