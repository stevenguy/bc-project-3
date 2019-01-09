const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  photoURL: { type: String, required: false },
  role: {type: String, required: false}
  //original user model
  // user_name: { type: String, required: true },
  //   first_name: { type: String, required: true },
  //   last_name: { type: String, required: true },
  //   email: { type: String, required: true },
  //   role: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
