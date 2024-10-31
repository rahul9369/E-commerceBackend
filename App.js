const express = require("express");
const app = express();
const seedDB = require("./seed");
const seedDB1 = require("./seedProfile");
const productRoutes = require("./routes/productRoute");
const userRoutes = require("./routes/userRouter");
require("dotenv").config();

const mongoose = require("mongoose");
mongoose
  // .connect("mongodb://127.0.0.1:27017/myapp")
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log("OH NO ERROR");
    console.log(err);
  });

// app.get("/", () => {
//   "get data";
// });

seedDB();
seedDB1();

// req.body ko backend me pass karne ke iska use karte hai
app.use(express.json());
app.use(productRoutes);
app.use(userRoutes);

app.listen(3000, () => {
  console.log("server Start at Port 3000!!!");
});
