const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminCtrl = require('../controllers/admin');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

router.get('/', auth, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), adminCtrl.getAdminPage);

module.exports = router;
