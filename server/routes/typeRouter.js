const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), typeController.create)
router.post('/destroy/:id', typeController.destroy) //dev
router.get('/', typeController.getAll)
router.get('/:id', typeController.getOne) //dev

module.exports = router