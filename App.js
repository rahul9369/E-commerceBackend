const express = require("express");
const app = express();
const cors = require("cors");
//const seedDB = require("./seed");
//const seedDB1 = require("./seedProfile");
const productRoutes = require("./routes/productRoute");
const userRoutes = require("./routes/userRouter");
const cartRoutes = require("./routes/cartRouter");
require("dotenv").config();

app.use(cors());

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

//seedDB();
//seedDB1();

// req.body ko backend me pass karne ke iska use karte hai
app.use(express.json());
app.use(productRoutes);
app.use(userRoutes);
app.use(cartRoutes);

app.listen(3000, () => {
  console.log("server Start at Port 3000!!!");
});
