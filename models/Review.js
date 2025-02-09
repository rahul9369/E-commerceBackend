const mongoose = require("mongoose");
const user = require("./user");
const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  comment: {
    type: String,
    require: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
