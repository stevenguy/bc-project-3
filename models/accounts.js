const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  
  name: { type: String, required: true },
  number: { type: Number, required: true },
  type: {type: String, required: true}
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
