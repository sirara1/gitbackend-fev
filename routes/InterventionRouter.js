var express = require('express');
var router = express.Router();
const InterventionController = require('../controllers/InterventionController');

/*get Interventions */
router.get('/getAllInterventions',InterventionController.getAllInterventions ); 
router.get('/getInterventionById/:id',InterventionController.getInterventionById ); 
router.post('/addIntervention',InterventionController.addIntervention ); 
router.put('/updateIntervention/:id',InterventionController.updateIntervention ); 
router.delete('/deleteInterventionById/:id',InterventionController.deleteInterventionById ); 



module.exports = router;