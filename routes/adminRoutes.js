const express = require('express')
const formidable = require('express-formidable')
const router = express.Router();
const adminController = require('../controller/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/getAllUsers', authMiddleware.signIn, authMiddleware.isAdmin, adminController.getAllUsers);
router.get('/adminRoute', authMiddleware.signIn, authMiddleware.isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})
router.get('/allAdminWorkshop', authMiddleware.signIn, authMiddleware.isAdmin, adminController.getAdminPost)
router.put('/approveStatus/:id', adminController.approveStatusController)
router.put('/disapproveStatus/:id', adminController.disApproveStatusController)
module.exports = router