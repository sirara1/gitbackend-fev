var express = require ('express');
var router = express.Router(); 
const osController = require('../controllers/oscontroller');
/* GET home page. */
router.get('/getOsInformation', osController.getOsInformation );

module.exports = router; 