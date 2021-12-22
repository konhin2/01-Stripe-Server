const router = require('express').Router()

const checkoutController = require('./../controllers/checkoutController')

router.post('/create-checkout-session', checkoutController.createCheckoutSession)

module.exports = router