const express = require('express')
const { newOrder, getOrder, updateOrderStatus} = require('../controllers/orderControllers')
const router = express.Router()

router.route('/neworder').post(newOrder)
router.route('/getorder').post(getOrder)
router.route('/updateorder').post(updateOrderStatus)

module.exports = router;