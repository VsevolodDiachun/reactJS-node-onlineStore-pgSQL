const {Type} = require('../DataBase/models')
const ApiError = require('../error/ApiError')

class TypeController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const type = await Type.create({name})
            return res.json(type)
        } catch (e) {
            return next(ApiError.badRequest('Помилка'))
        }
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

    async getOne(req, res) {
        const {id} = req.params
        const types = await Type.findOne({where: {id}})
        return res.json(types)
    }

    async destroy(req, res, next) { //dev
        try {
            const {id} = req.params
            const typeName = await Type.findOne({where: {id}})
            const types = await Type.destroy({where: {id}})
            return res.json({message: types ? `Запис '${typeName.name}' з таблиці видалено.` : "Помилка, поля з таким імʼям не існує."})
        } catch (e) {
            return next(ApiError.badRequest('Помилочка, не правильна назва обʼєкту :c'))
        }
    }
}

module.exports = new TypeController()