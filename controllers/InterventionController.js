const InterventionModel = require('../models/InterventionSchema');
const userModel = require("../models/userSchema");
 module.exports.addIntervention = async (req, res) => {
    try {
      const { nomclient, adresseclient, telclient, description, statut, priorite, } = req.body;
  
      if (!nomclient & !adresseclient & !telclient  & !description & !statut  & !priorite ) {
        throw new Error("erreur data");
      }
  
      const Intervention = await InterventionModel.create({
        nomclient, 
        adresseclient, 
        telclient, 
        description, 
        statut, 
        //techniciens,
        priorite,
      });
  
      res.status(200).json({ Intervention });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }; 

  module.exports.getAllInterventions = async (req, res) => {
    try {
      const interventionList = await InterventionModel.find(); 
  
      if (!interventionList || interventionList.length === 0) {
        throw new Error("Aucune intervention trouveé");
      }
  
      res.status(200).json({ interventionList });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.getInterventionById = async (req, res) => {
    try {
      const id = req.params.id;
      const Intervention = await InterventionModel.findById(id);
  
      if (!Intervention || Intervention.length === 0) {
        throw new Error("Intervention introuvable");
      }
  
      res.status(200).json({ Intervention });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  module.exports.deleteInterventionById = async (req, res) => {
    try {
      const id = req.params.id;
  
      const InterventionById = await InterventionModel.findById(id);
  
      if (!InterventionById || InterventionById.length === 0) {
        throw new Error("intervention introuvable");
      }
  
        
      await userModel.updateMany({}, {
          $pull: { Interventions: id },
        });
  
      await InterventionModel.findByIdAndDelete(id);
  
      res.status(200).json("deleted");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.updateIntervention = async (req, res) => {
    try {
      const id = req.params.id;
      const { nomclient, adresseclient, telclient, description, priorite } = req.body;
  
      const InterventionById = await InterventionModel.findById(id);
  
      if (!InterventionById) {
        throw new Error("intervention introuvable");
      }
  
      if (!nomclient & !adresseclient & !telclient & !description & !priorite ) {
        throw new Error("erreur data");
      }
  
      await InterventionModel.findByIdAndUpdate(id, {
        $set: { nomclient, adresseclient, telclient, description, priorite },
      });
  
      const updated = await InterventionModel.findById(id);
  
      res.status(200).json({ updated });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };