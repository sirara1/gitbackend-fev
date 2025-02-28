var express = require('express');
var router = express.Router();

const equipementController = require('../controllers/equipementController');


router.post('/addequipement',equipementController.addequipement ); 
router.get('/getAllequipement',equipementController.getAllequipement ); 
router.delete('/deleteequipementById/:id',equipementController.deleteequipementById ); 
router.put('/updateequipement/:id',equipementController.updateequipement ); 



module.exports = router;
