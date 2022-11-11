const { Router } = require('express');
const authController = require('../controllers/authController');
const paymentController = require('../controllers/paymentController');
const router = Router();

router.post('/register',authController.register);
router.post('/login',authController.login);
router.post('/payment',paymentController.pay);
router.get('/verify-email', authController.emailverification)
module.exports = router;
