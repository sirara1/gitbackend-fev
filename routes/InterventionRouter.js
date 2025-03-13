var express = require('express');
var router = express.Router();
const InterventionController = require('../controllers/InterventionController');

/*get Interventions */
router.get('/getAllInterventions',InterventionController.getAllInterventions ); 
router.get('/searchInterventionByType',InterventionController.searchInterventionByType); 
router.get('/getInterventionsByDate',InterventionController.getInterventionsByDate); 
router.get('/searchInterventionByClient',InterventionController.searchInterventionByClient); 
router.get('/getInterventionById/:id',InterventionController.getInterventionById ); 
router.post('/addIntervention',InterventionController.addIntervention ); 
router.put('/updateIntervention/:id',InterventionController.updateIntervention ); 
router.put('/affect',InterventionController.affect ); 
router.put('/desaffect',InterventionController.desaffect ); 

router.delete('/deleteInterventionById/:id',InterventionController.deleteInterventionById ); 



module.exports = router;