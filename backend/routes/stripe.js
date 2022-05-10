const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const stripeCtrl = require('../controllers/stripe');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

//  auth, verifyRoles(ROLES_LIST.User, ROLES_LIST.Admin, ROLES_LIST.Editor);
router.get('/payment/success', stripeCtrl.successPayment);
router.get('/payment/cancel', stripeCtrl.cancelPayment);
router.post('/create-checkout-session', stripeCtrl.addPayment);

module.exports = router;