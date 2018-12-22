const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  
    user_name: { type: String, required: true },
    user_firstname: { type: String, required: true },
    user_lastname: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },

});

const User = mongoose.model("User", userSchema);

module.exports = User;