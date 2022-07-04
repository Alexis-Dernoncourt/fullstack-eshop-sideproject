const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/logout', userCtrl.logout);
router.get('/confirm-email/:id/:username', auth, userCtrl.confirmEmail);
router.post('/modify-password/:id', auth, userCtrl.modifyPassword);
router.post('/reset-password', userCtrl.forgotPassword);
router.post('/update-password', userCtrl.updatePassword);
router.post('/update-adress', auth, userCtrl.updateAdress);
router.get('/refresh', auth, userCtrl.refreshToken);
router.get('/profile/:id', auth, userCtrl.profile);

module.exports = router;
