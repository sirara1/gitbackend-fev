var express = require('express');
var router = express.Router();
const RTIcontroller = require('../controllers/RTIcontroller');
const upload = require('../middlewares/uploadFile');
router.get('/getAllRTI',RTIcontroller.getAllRTI ); 
router.post('/addRTI',RTIcontroller.addRTI ); 
router.delete('/deleteRTIById/:id',RTIcontroller.deleteRTIById ); 
router.put('/updateRTI/:id',RTIcontroller.updateRTI); 


module.exports = router;