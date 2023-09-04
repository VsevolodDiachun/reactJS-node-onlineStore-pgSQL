const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')

router.post('/', deviceController.create)
router.post('/destroy/:id', deviceController.destroy) //dev
router.get('/', deviceController.getAll)
router.get('/devicesfrombasket', deviceController.getAllFromDeviceToBasketDevices)
router.get('/getall', deviceController.getAllUnLimit)
router.get('/:id', deviceController.getOne)

module.exports = router