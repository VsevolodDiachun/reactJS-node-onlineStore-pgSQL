const Router = require('express')
const router = new Router()
const ratingController = require('../controllers/ratingController')

router.post('/', ratingController.create)
router.post('/destroy/:id', ratingController.destroy)
router.post('/one', ratingController.getOne)
router.post('/oneglobal', ratingController.getOneGlobal)
router.post('/all', ratingController.getAll)

module.exports = router