const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const productCtrl = require('../controllers/product');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');
const upload = require('../middleware/multer-config');

router.get('/', productCtrl.getAllPublishedProducts);
router.get('/all', auth, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), productCtrl.getAllProducts);
router.post('/', auth, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), upload, productCtrl.addProduct);
router.get('/:id', productCtrl.findProduct);
router.put('/:id', auth, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), upload, productCtrl.updateProduct);
router.delete('/:id', auth, verifyRoles(ROLES_LIST.Admin), productCtrl.deleteProduct)

module.exports = router;
