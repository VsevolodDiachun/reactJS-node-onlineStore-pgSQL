const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.post('/', basketController.create)
router.post('/destroy/:id', basketController.destroy) //dev
router.get('/', basketController.getAll)

module.exports = router