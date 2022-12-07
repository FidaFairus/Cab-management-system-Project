const express = require('express');
const cc = require('../controllers/customerController');
const controller = require('../controllers/admincontroller');


const router = express.Router()

router.get('/', cc.login);
router.post('/', cc.loginPost);
router.get('/login', cc.login);
router.get('/search', cc.booking);
router.get('/signup', cc.create);
router.post('/signup', cc.createPost);
router.get('/home', cc.home);
router.post('/login', cc.loginPost);
router.get('/updateuser/:id', cc.update);
router.post('/updateuser/:id', cc.updatePost);
router.get('/delete/:id', cc.delete);
router.get('/updateuser', cc.updateUser);
router.get('/userprofile', cc.userprofile);
router.get('/logout', cc.logout);
router.get('/admin', controller.admin);
router.post('/admin', controller.adminPost);
router.get('/index', controller.index);
router.get('/index-routes', controller.indexRoute);
router.get('/create-routes', controller.create);
router.post('/create-routes', controller.createPost);
router.get('/update-routes/:id', controller.update);
router.post('/update-routes/:id', controller.updatePost);
router.get('/delete-routes/:id', controller.deleteroutes);
router.get('/logout-admin', controller.logout);


// router.get('/update/:id', controller.update);
// router.post('/update/:id', controller.updatePost);
// router.get('/delete/:id', controller.delete);



//router.post('/payment', cc.createInvoice);
module.exports = router;