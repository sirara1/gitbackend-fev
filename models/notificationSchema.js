const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema(
  {
    message: { type: String, required: true},
   dateenvoie : { type: String, required: true},
   }
);
const notification = mongoose.model("notification",notificationSchema);

module.exports = notification;