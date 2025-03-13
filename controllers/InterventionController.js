const InterventionModel = require('../models/InterventionSchema');
const userModel = require("../models/userSchema");
 module.exports.addIntervention = async (req, res) => {
    try {
      const { nomclient, adresseclient, telclient, description, statut, priorite, typeIntervention, } = req.body;
  
      if (!nomclient & !adresseclient & !telclient  & !description & !statut  & !priorite & !typeIntervention ) {
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
        typeIntervention,
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
      const { nomclient, adresseclient, telclient, description, priorite, typeIntervention } = req.body;
  
      const InterventionById = await InterventionModel.findById(id);
  
      if (!InterventionById) {
        throw new Error("intervention introuvable");
      }
  
      if (!nomclient & !adresseclient & !telclient & !description & !priorite & !typeIntervention ) {
        throw new Error("erreur data");
      }
  
      await InterventionModel.findByIdAndUpdate(id, {
        $set: { nomclient, adresseclient, telclient, description, priorite, typeIntervention },
      });
  
      const updated = await InterventionModel.findById(id);
  
      res.status(200).json({ updated });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  module.exports.affect = async (req, res) => {
    try {
      const { userId, InterventionId } = req.body;
  
      const InterventionById = await InterventionModel.findById(InterventionId);
  
      if (!InterventionById) {
        throw new Error("Intervention introuvable");
      }
      const checkIfUserExists = await userModel.findById(userId);
      if (!checkIfUserExists) {
        throw new Error("User not found");
      }
  
      await InterventionModel.findByIdAndUpdate(InterventionId, {
        $set: { techniciens: userId },
      });
  
      await userModel.findByIdAndUpdate(userId, {
        $push: { Interventions: InterventionId },
      });
  
      res.status(200).json('affected');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  module.exports.desaffect = async (req, res) => {
    try {
      const { userId, InterventionId } = req.body;
  
      const InterventionById = await InterventionModel.findById(InterventionId);
  
      if (!InterventionById) {
        throw new Error("Intervention introuvable");
      }
      const checkIfUserExists = await userModel.findById(userId);
      if (!checkIfUserExists) {
        throw new Error("User not found");
      }
  
      await InterventionModel.findByIdAndUpdate(InterventionId, {
        $unset: { techniciens: 1 },// null "" 
      });
  
      await userModel.findByIdAndUpdate(userId, {
        $pull: { Interventions: InterventionId },
      });
  
      res.status(200).json('desaffected');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  module.exports.getInterventionsByDate = async (req, res) => {
    try {
        const { date } = req.query; // Récupérer la date depuis l'URL
        let interventions;

        if (date) {
            // Filtrer les interventions par date
            interventions = await InterventionModel.find({
                date: {
                    $gte: new Date(date + "T00:00:00.000Z"), // Début de la journée
                    $lte: new Date(date + "T23:59:59.999Z")  // Fin de la journée
                }
            });
        } else {
            // Si aucune date n'est fournie, renvoyer toutes les interventions
            interventions = await InterventionModel.find();
        }

        if (!interventions || interventions.length === 0) {
            return res.status(404).json({ message: "Aucune intervention trouvée pour cette date" });
        }

        res.status(200).json({ interventions });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.searchInterventionByClient = async (req, res) => {
  try {
      const { nomclient } = req.query; // Récupération du paramètre nomclient de la requête
      
      // Vérification si nomclient est fourni
      if (!nomclient) {
          throw new Error("Veuillez fournir un nom de client pour la recherche.");
      }

      // Recherche des interventions avec nomclient correspondant (insensible à la casse)
      const interventions = await InterventionModel.find({
          nomclient: { $regex: nomclient, $options: "i" } // Recherche insensible à la casse
      });

      // Vérification si des interventions sont trouvées
      if (!interventions || interventions.length === 0) {
          throw new Error("Aucune intervention trouvée pour ce client.");
      }

      // Comptage du nombre d'interventions trouvées
      const count = interventions.length;

      // Retour de la réponse avec la liste des interventions et le comptage
      res.status(200).json({ interventions, count });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
module.exports.searchInterventionByType = async (req, res) => {
  try {
      const { typeIntervention } = req.query; // Récupération du paramètre typeIntervention de la requête
      
      // Vérification si typeIntervention est fourni
      if (!typeIntervention) {
          throw new Error("Veuillez fournir un type d'intervention pour la recherche.");
      }

      // Recherche des interventions avec typeIntervention correspondant (insensible à la casse)
      const interventions = await InterventionModel.find({
          typeIntervention: { $regex: typeIntervention, $options: "i" } // Recherche insensible à la casse
      });

      // Vérification si des interventions sont trouvées
      if (!interventions || interventions.length === 0) {
          throw new Error("Aucune intervention trouvée pour ce type.");
      }

      // Comptage du nombre d'interventions trouvées
      const count = interventions.length;

      // Retour de la réponse avec la liste des interventions et le comptage
      res.status(200).json({ interventions, count });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
