const { Router } = require('express')
const controller = require('../controllers/item.controller')
// const auth = require('../middleware/auth') // aktifkan kalau endpoint butuh login (Cognito)

const router = Router()

router.get('/', controller.list)
router.get('/:id', controller.get)
router.post('/', controller.create) // contoh pakai auth: router.post('/', auth, controller.create)
router.delete('/:id', controller.remove)

module.exports = router
