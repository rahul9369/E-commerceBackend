const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  img: {
    type: String,
  },
  address: {
    type: String,
  },
  phonenumber: {
    type: String,
  },
});

const Profile = mongoose.model("Profile12", profileSchema);
module.exports = Profile;
