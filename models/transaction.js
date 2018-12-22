const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  
  date: { type: Date, default: Date.now },
  transaction: { type: String, required: true },
  memo: { type: String, required: true },
  details: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  account: { type: String, required: true },
  description: { type: String, required: true },
  preparer: { type: String, required: true },
  prepared_date: { type: Date, default: Date.now },
  approver: { type: String, required: true },
  approved_date: { type: Date, default: Date.now }

});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
