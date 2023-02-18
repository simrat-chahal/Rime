const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
  }
);

const usersModel = mongoose.model("users", usersSchema);

module.exports = usersModel;
