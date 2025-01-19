const User = require("../models/user");
const Product = require("../models/product");

const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.params.userid).populate("cart");
    console.log(user);
    res
      .status(200)
      .json({ msg: "Successfully Get All Product!!", userCart: user.cart });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const pushCart = async (req, res) => {
  try {
    // Find the product by ID
    const product = await Product.findById(req.params.itemid);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Get the user from the request (populated by middleware)
    const user = req.user;
    if (!user) {
      return res.status(401).json({ msg: "User not authenticated" });
    }

    // Add the product to the user's cart
    user.cart.push(product._id);

    // Save the user with the updated cart
    await user.save();

    res.status(200).json({
      msg: "Product added to cart successfully",
      userCart: user.cart,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getCart, pushCart };
