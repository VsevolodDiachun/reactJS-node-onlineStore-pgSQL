const Router = require('express')
const router = new Router()
const basketDevicesController = require('../controllers/basketDevicesController')

router.post('/', basketDevicesController.create)
router.post('/destroy', basketDevicesController.destroy) //dev
router.get('/', basketDevicesController.getAll)
router.post('/all', basketDevicesController.getAllDevicesFromBasket)
router.post('/one', basketDevicesController.getOneDFB)
router.post('/alldata', basketDevicesController.allData)
router.post('/count', basketDevicesController.count)

module.exports = router