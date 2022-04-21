const express = require('express')
const { createEvent,getEvent } = require('../controllers/eventControllers')
 
const router = express.Router()

router.route('/createEvent').post(createEvent)
router.route('/getevent').get(getEvent)

module.exports = router;