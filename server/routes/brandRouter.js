const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')

router.post('/', brandController.create)
router.post('/destroy/:id', brandController.destroy) //dev
router.get('/', brandController.getAll)

module.exports = router