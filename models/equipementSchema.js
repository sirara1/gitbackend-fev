const mongoose = require("mongoose");
const equipementSchema = new mongoose.Schema(
  {
    nomequipement :{ type: String, required: true },
    typeE: {
        type: String,
        enum: ["cuisine professionel", "machine a café","froid commerciale", "buvendrie" ],
      },
    nomPieceRechange: { type: String, required: false},
    designationPR : { type: String, required: false},
   }
);
const equipement = mongoose.model("equipement", equipementSchema);

module.exports = equipement;  
