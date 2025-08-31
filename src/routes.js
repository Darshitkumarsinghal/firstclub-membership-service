const express = require('express');
const router = express.Router();
const subscriptionController = require('./controllers/subscriptionController');
const adminController = require('./controllers/adminController');


router.use('/', subscriptionController);
router.use('/admin', adminController);


module.exports = router;