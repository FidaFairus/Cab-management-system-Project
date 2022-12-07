const express = require('express');
const cc = require('../controllers/driverController');
const controller = require('../controllers/bookingController');
const router = express.Router()


router.get('/driverhome', cc.home);
router.get('/search', cc.booking);
router.post('/search', controller.bookPost);
router.get('/driversignup', cc.create);
router.post('/driversignup', cc.createPost);
router.get('/driverlogin', cc.driverLogin);
router.post('/driverlogin', cc.driverloginPost);
router.get('/driverupdate/:id', cc.update);
router.post('/driverupdate/:id', cc.updatePost);
router.get('/driverdelete/:id', cc.delete);
router.get('/driverprofile', cc.driverprofile);
router.get('/logout', cc.logout);
router.get('/payment', controller.payment);
router.get('/invoice/:id', controller.invoice);
router.get('/mybookings', controller.mybookings);

module.exports = router;