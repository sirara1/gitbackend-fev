const mongoose = require("mongoose");
const RTISchema = new mongoose.Schema(
  {
    contenue: {type : String },

    DATE : { type: Date },

    RTI_image: { type: String, require: false, default: "RTI.png" },
    
      },
    
  { timestamps: true }
);

const RTI = mongoose.model("RTI", RTISchema);

module.exports = RTI;