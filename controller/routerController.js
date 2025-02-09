const product = require("../models/product");
const Product = require("../models/product");
const Review = require("../models/Review");
const Profile = require("../models/Profile");

const AllProduct = async (req, res) => {
  try {
    const Prod = await Product.find({});
    res.status(200).json({ Prod, massage: "All Product!!!" });
  } catch (err) {
    res.status(400).json({ error: err.massage });
  }
};

const getallProfile = async (req, res) => {
  try {
    const Prof = await Profile.find({});
    res.status(200).json({ message: "All Profile find!!!", Prof });
  } catch (err) {
    res.status(400).json({ message: "Not found the Profile data" });
  }
};

const addProduct = async (req, res) => {
  try {
    const Prod1 = await Product.create(req.body);
    // console.log(req.body);
    // res.send(Prod1);
    res.status(200).json({ Prod1, massage: "Add Product!!!!!" });
  } catch (err) {
    res.status(400).json({ error: err.massage });
  }
};

const getProduct = async (req, res) => {
  try {
    const Prod = await Product.findById(req.params.id).populate({
      path: "Reviews",
      populate: { path: "user" },
    });

    console.log(Prod);
    // console.log(req.params.id);
    // res.send(Prod);
    res.status(200).json({ Prod, massage: "Get Particular Product!!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.massage });
  }
};
const getProfile = async (req, res) => {
  try {
    const Prof = await Profile.findById(req.params.id);
    console.log(Prof);
    res
      .status(200)
      .json({ Prof, message: "Get the Profile data successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ error: err.message, message: "Not find the Profile" });
  }
};
const editProduct = async (req, res) => {
  try {
    const Prod = await Product.findByIdAndUpdate(req.params.id, req.body);
    // res.send(Prod);
    res.status(200).json({ Prod, massage: "Edit the Product!!" });
  } catch (err) {
    res.status(400).json({ error: err.massage });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const Prod = await Product.findByIdAndDelete(req.params.id);
    // res.send(Prod);
    res.status(200).json({ Prod, massage: "Delete Product!!!" });
  } catch (err) {
    res.status(400).json({ error: err.massage });
  }
};

const commentProduct = async (req, res) => {
  try {
    const Prod = await Product.findById(req.params.id);
    console.log(req.body);
    const { rating, comment, userid } = req.body;
    //const rating = req.body.rating;
    // const comment = req.body.comment;
    console.log(comment);
    console.log(rating);
    const review = new Review({
      rating: rating,
      comment: comment,
      user: userid,
    });
    Prod.Reviews.push(review);
    const fullComment = await (await review.save()).populate("user");
    console.log(fullComment);
    await Prod.save();
    console.log(review);
    res.status(200).json({
      massage: "comment added successfully",
      comment: fullComment.comment,
      rating: fullComment.rating,
      user: fullComment.user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "cannot add comment due to internal error ",
      error: err.massage,
    });
  }
};

const editcommentProduct = async (req, res) => {
  try {
    const { Rid } = req.params;
    const { ratingV, commentV } = req.body;

    // Check if the product exists (optional)
    const Reviews = await Review.findByIdAndUpdate(Rid, {
      rating: ratingV,
      comment: commentV,
    });

    console.log(Reviews);
    if (!Reviews) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Review updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      message: "Failed to update the review due to server error",
      error: err.message,
    });
  }
};

const deletecommentProduct = async (req, res) => {
  try {
    const { Rid } = req.params;

    const Reviews = await Review.findByIdAndDelete(Rid);
    if (!Reviews) {
      return res.status(404).json({ message: "Product not found!" });
    }
    console.log(Reviews);
    res.status(200).json({ message: "Review deleted successfully!" });
  } catch (err) {
    res.status(400).json({
      message: "Failed to delete the review due to server error",
      error: err.message,
    });
  }
};

module.exports = {
  AllProduct,
  addProduct,
  getProduct,
  editProduct,
  deleteProduct,
  commentProduct,
  editcommentProduct,
  deletecommentProduct,
  getProfile,
  getallProfile,
};
