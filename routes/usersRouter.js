var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
/*const upload = require('../middlewares/uploadFile');*/
/*const {requireAuthUser} = require('../middlewares/authMiddleware');*/


/* GET users listing. */
router.post('/addUserTechnicien',userController.addUserTechnicien); 
router.post('/addUserAdmin',userController.addUserAdmin); 
router.post('/login',userController.login);  
router.get('/searchUserByUsername',userController.searchUserByUsername); 
router.get('/getAllTechnicien',userController.getAllTechnicien); 
router.get('/getAllAdmin',userController.getAllAdmin); 
router.get('/getAllUsers',userController.getAllUsers); 
router.get('/getUserById/:id',userController.getUserById); 
router.delete('/deleteUserById/:id',userController.deleteUserById); 
router.put('/updateuserById/:id',userController.updateuserById); 


module.exports = router;

