const equipementModel = require('../models/equipementSchema');

//const InterventionModel = require('../models/InterventionSchema');

const userModel = require("../models/userSchema");

module.exports.addequipement = async (req, res) => {
    try {
      const {nomequipement, typeE, nomPieceRechange, designationPR, } = req.body;
  
      if (!nomequipement & !typeE & !nomPieceRechange & !designationPR  ) {
        throw new Error("erreur data");
      }
  
      const equipement = await equipementModel.create({
        nomequipement, 
        typeE, 
        nomPieceRechange, 
       designationPR, 
      });
  
      res.status(200).json({ equipement });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }; 
  module.exports.getAllequipement = async (req, res) => {
    try {
      const equipementList = await equipementModel.find(); 
  
      if (!equipementList || equipementList.length === 0) {
        throw new Error("Aucun equipement trouveé");
      }
  
      res.status(200).json({ equipementList });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  module.exports.deleteequipementById = async (req, res) => {
    try {
      const id = req.params.id;
  
      const equipementById = await equipementModel.findById(id);
  
      if (!equipementById || equipementById.length === 0) {
        throw new Error("equipement introuvable");
      }
  
        
      await userModel.updateMany({}, {
          $pull: { equipements: id },
        });
  
      await equipementModel.findByIdAndDelete(id);
  
      res.status(200).json("deleted");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  module.exports.updateequipement = async (req, res) => {
    try {
      const id = req.params.id;
      const { nomequipement, typeE, nomPieceRechange, designationPR } = req.body;
  
      const equipementById = await equipementModel.findById(id);
  
      if (!equipementById) {
        throw new Error("equipement introuvable");
      }
  
      if (!nomequipement & !typeE & !nomPieceRechange & !designationPR  ) {
        throw new Error("erreur data");
      }
  
      await equipementModel.findByIdAndUpdate(id, {
        $set: { nomequipement, typeE, nomPieceRechange, designationPR },
      });
  
      const updated = await equipementModel.findById(id);
  
      res.status(200).json({ updated });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };