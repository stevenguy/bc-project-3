const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const journalSchema = new Schema({
  createdBy: { type: String}
  
});

const Journal = mongoose.model("Journal", journalSchema);

module.exports = Journal;