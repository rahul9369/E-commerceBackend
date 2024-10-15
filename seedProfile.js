const mongoose = require("mongoose");
const Profile = require("./models/Profile");

const profiles = [
  {
    fullname: "Rahul Prajapati",
    username: "RAhul_2508",
    email: "rp2508@gmail.com",
    password: "Rahul@1234",
    img: "https://images.unsplash.com/photo-1695578130391-929bdfff85d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    address: "India",
    phonenumber: "1234567890",
  },
  {
    fullname: "Sonam",
    username: "Sonam_2508",
    email: "sk2508@gmail.com",
    password: "sonam@1234",
    img: "https://images.unsplash.com/photo-1695578130391-929bdfff85d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    address: "India",
    phonenumber: "1234567890",
  },
  {
    fullname: "Dimpal",
    username: "Dimpal_2508",
    email: "dp2508@gmail.com",
    password: "Dimpal@1234",
    img: "https://images.unsplash.com/photo-1695578130391-929bdfff85d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    address: "India",
    phonenumber: "1234567890",
  },
  {
    fullname: "Rahul ",
    username: "RAhul_2508",
    email: "rp2508@gmail.com",
    password: "Rahul@1234",
    img: "https://images.unsplash.com/photo-1695578130391-929bdfff85d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    address: "India",
    phonenumber: "1234567890",
  },
];

const seedDB = async () => {
  await Profile.insertMany(profiles);
  console.log("Profile seeded");
};
module.exports = seedDB;
