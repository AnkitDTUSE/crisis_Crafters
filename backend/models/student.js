const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/disaster");

const studentSchema = mongoose.Schema({
  name: String,
  roll: String,
  guardian: String,
  password: String,
  phnNo1: Number,
  phnNo2: Number,
  profilePic: {
    type: String,
    default: "pfp.png",
  },
});

module.exports = mongoose.model("student", studentSchema);
