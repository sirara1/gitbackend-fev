var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middlewares/uploadFile');



/* GET users listing. */
router.post('/addUserTechnicien',userController.addUserTechnicien); 
router.post('/addUserAdmin',userController.addUserAdmin); 
router.get('/getAllUsers',userController.getAllUsers); 
router.get('/getUserById/:id',userController.getUserById); 
router.delete('/deleteUserById/:id',userController.deleteUserById); 
router.put('/updateuserById/:id',userController.updateuserById); 
router.get('/searchUserByUsername',userController.searchUserByUsername); 
router.get('/getAllTechnicien',userController.getAllTechnicien); 
router.get('/getAllAdmin',userController.getAllAdmin); 

module.exports = router;

