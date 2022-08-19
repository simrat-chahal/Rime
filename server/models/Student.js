const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
  }
);

const StudentModel = mongoose.model("student", studentSchema);

module.exports = StudentModel;
