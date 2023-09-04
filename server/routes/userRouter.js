const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/destroy/:id', userController.destroy) //dev
router.get('/auth', authMiddleware, userController.auth)
router.get('/accounts', userController.getAllAccount) //dev
router.get('/baskets', userController.getAllBasket) //dev

module.exports = router