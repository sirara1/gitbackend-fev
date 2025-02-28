const RTIModel = require('../models/RTISchema');

//const InterventionModel = require('../models/InterventionSchema');

const userModel = require("../models/userSchema");

 module.exports.addRTI= async (req, res) => {
    try {
      const { contenue, DATE, } = req.body;
  
      if (!contenue & !DATE ) {
        throw new Error("erreur data");
      }
  
      const RTI = await RTIModel.create({
        contenue, 
        DATE, 
      });
  
      res.status(200).json({ RTI });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }; 
  module.exports.getAllRTI = async (req, res) => {
    try {
      const RTIList = await RTIModel.find(); 
  
      if (!RTIList || RTIList.length === 0) {
        throw new Error("Aucune remarque trouveé");
      }
  
      res.status(200).json({ RTIList });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  //module.exports.addinterventionImg = async (req,res) => {
    //try {
       // const {contenue , DATE } = req.body;
       // const {filename} = req.file

        //const RTI = await userModel.create({
          //  contenue, DATE, RTI_image : filename
        //})
      //  res.status(200).json({RTI});
    //} catch (error) {
        //res.status(500).json({message: error.message});
    //} 
//}  
module.exports.deleteRTIById = async (req, res) => {
  try {
    const id = req.params.id;

    const RTIById = await RTIModel.findById(id);

    if (!RTIById || RTIById.length === 0) {
      throw new Error("remarque introuvable");
    }

      
    await userModel.updateMany({}, {
        $pull: { RTIs: id },
      });

    await RTIModel.findByIdAndDelete(id);

    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.updateRTI = async (req, res) => {
  try {
    const id = req.params.id;
    const { contenue, DATE, RTI_image } = req.body;

    const RTIById = await RTIModel.findById(id);

    if (!RTIById) {
      throw new Error("remarque introuvable");
    }

    if (!contenue & !DATE & !RTI_image ) {
      throw new Error("erreur data");
    }

    await RTIModel.findByIdAndUpdate(id, {
      $set: { contenue, DATE, RTI_image, },
    });

    const updated = await RTIModel.findById(id);

    res.status(200).json({ updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};