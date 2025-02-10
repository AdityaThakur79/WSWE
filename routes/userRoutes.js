const express = require('express')
const formidable = require('express-formidable')
const router = express.Router();
const Authentication = require('../controller/Authentication');
const userController = require('../controller/userController')
const ExpressFormidable = require('express-formidable');
const { signIn } = require('../middlewares/authMiddleware');

router.post('/userRegistration', Authentication.registerUserController)
router.post("/verify-otp", Authentication.verifyOTPController);
router.post('/userLogin', Authentication.userLoginController)
router.post('/createWorkshopPost/:userId', formidable(), userController.createWorkshopPostController)
router.put('/forgotPasswrod', Authentication.forgotPasswordController);
router.get('/getAllWorkshopPost', userController.getAllWorkshopPost);
router.get('/getSingleWorkshop/:workshopId',userController.getSingleWorkshop)
router.get('/postPhoto/:postId', userController.getPostPhoto)
router.get('/getSingleUserById/:userId', userController.getSingleUserById)
router.get('/DecodeUserIdFromJwt/:token', userController.decodeUserJwtController)
router.post('/addEmergencyNumber', userController.addEmergencyNumber)
router.put('/removeEmergencyNumber', userController.removeEmergencyNumber)
router.get('/getEmergencyNumber/:userId', userController.getEmergencyNumber)
router.put('/AddUserToWorkshop/:workShopId/:userId', userController.addUserToWorkshop)
router.get('/getUsersRegisteredDetais/:workshopId',userController.getWorkshopParticipantsDetail)
router.get('/searchWorkshop/:keyword',userController.searchWorkshop)

// below is the route for getting the safe user locations
router.get('/safeLocations/:latitude/:longitude/:keyword',userController.getSafeLocations);
// below is the route for executing the sos controller
router.post('/send-sos', userController.executeSosController)
// below is the route for location tracking
router.post('/createLink',userController.generateLinksController)
router.get('/getLinkData/:linkId',userController.getLinkData )
//Bookmark
router.post("/addBookmark/:jobId", signIn, userController.addBookmark);
router.post("/removeBookmark/:jobId", signIn, userController.removeBookmark);
router.post("/bookmarks", signIn, userController.getBookmarks);

module.exports = router;