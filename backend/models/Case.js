const mongoose = require("mongoose")

const caseSchema = new mongoose.Schema({

 trackingId: {
  type: String,
  unique: true
 },

 category: String,
 department: String,
 location: String,
 severity: String,
 description: String,
 anonymous: Boolean,

 file: String,
 notes: String,

 status: {
  type: String,
  default: "New"
 },

 assignedTo: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
 },

 createdAt: {
  type: Date,
  default: Date.now
 }

})

module.exports = mongoose.models.Case || mongoose.model("Case", caseSchema)