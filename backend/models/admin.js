const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  name: String,
  adminId: String,
  password: String,
  phnNo: Number,
  profilePic: {
    type: String,
    default: "pfp.png",
  },
});

module.exports = mongoose.model("admin", adminSchema);
