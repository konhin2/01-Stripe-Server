const router = require('express').Router()

const glassesController = require('./../controllers/glassesController')

router.post('/create', glassesController.create)
router.get("/getall", glassesController.getAll)
router.get("/getone/:glassesID", glassesController.getOne)

module.exports = router