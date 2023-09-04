const ApiError = require("../error/ApiError");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../DataBase/models')
const models = require('../DataBase/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'})
}

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password, role} = req.body
            if (!email || !password) {
                return next(ApiError.badRequest('Не вказано логін або пароль'))
            }

            const candidate = await User.findOne({where: {email}})
            if (candidate) {
                return next(ApiError.badRequest('Користувач з таким імʼям вже зареїстрований'))
            }

            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({email, password: hashPassword, role})
            await Basket.create({userId: user.id})
            const token = generateJwt(user.id, user.email, user.role)
            return res.json(token)
        } catch (e) {
            return next(ApiError.badRequest('помилка реєстрації'))
        }
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Wrong email'))
        }
        const comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Wrong password'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json(token)
    }

    async auth(req, res, next) {
        const {id, email, role} = req.user

        const token = generateJwt(id, email, role)
        return res.json({token})
    }

    async getAllAccount(req, res) { //dev
        const account = await User.findAll()
        return res.json(account)
    }

    async getAllBasket(req, res) { //dev
        const basket = await Basket.findAll()
        return res.json(basket)
    }

    async destroy(req, res, next) { //dev
        try {
            const {id} = req.params
            let login = ''
            await User.findOne({where: {id}})
                .then((user) => {login = user.email; Basket.destroy({where: {userId: id}}); return user.destroy()})
                .then(delUser => res.json({message: delUser ? `Запис '${login}' з таблиці видалено.` : "Помилка, поля з таким email не існує."}))
                .catch(e => next(ApiError.internal("Помилка, поля з таким email не існує.")))
        } catch (e) {
            next(ApiError.badRequest('123'))
        }
    }
}

module.exports = new UserController()