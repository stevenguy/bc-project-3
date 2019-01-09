const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  
  journal_id: { type: String }, //1
  date: { type: Date, default: Date.now }, //1
  transaction: { type: String, required: true }, //1
  memo: { type: String, required: true }, //1
  details: { type: String, required: true },
  amount: { type: Number, required: true }, //1
  type: { type: String, required: true }, //1
  account: { type: String, required: true }, //1
  description: { type: String, required: true }, //1
  preparer: { type: String, required: true }, // the logged in user
  prepared_date: { type: Date, default: Date.now }, // now
  approver: { type: String},
  approved_date: { type: Date},
  status: { type: String},
  year: { type: Number},
  month: { type: Number},
  quarter: { type: Number},
  journal_id: {
    type: Schema.Types.ObjectId,
    ref: "Journal"
  }

});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
