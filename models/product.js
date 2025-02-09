const mongoose = require("mongoose");
const Review = require("./Review");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  price: {
    type: Number,
    min: 0,
  },
  desc: {
    type: String,
  },
  Reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const product = mongoose.model("Product12", productSchema);
module.exports = product;
