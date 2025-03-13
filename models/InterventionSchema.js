const mongoose = require("mongoose");
const InterventionSchema = new mongoose.Schema(
  {
    nomclient :{ type: String, required: true },
    adresseclient : { type: String, required: true },
    telclient: { type: String, required: true },
    description : { type: String, required: true },

    statut: {
        type: String,
        enum: ["en cours", "Terminé","annulé","en attente", ],
        default: "en attente"
      },

      priorite: {
        type: String,
        enum: ["normal", "urgent","faible", ],
      },

      typeIntervention: {
        type: String,
        enum: ["installation", "maintenace sur place","maintenance depot","livraison", ],
      },

    techniciens : [{type : mongoose.Schema.Types.ObjectId,ref: 'user'}],
    etat:Boolean,
    
},
  { timestamps: true }
);

const Intervention = mongoose.model("Intervention", InterventionSchema);
module.exports = Intervention;