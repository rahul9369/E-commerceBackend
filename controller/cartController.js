const User = require("../models/user");
const Product = require("../models/product");

const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart");
    console.log(user);
    // res
    //   .status(200)
    //   .json({ msg: "Successfully Get All Product!!", userCart: user.cart });
    res.status(200).json(user.cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const pushCart = async (req, res) => {
  try {
    // Find the product by ID
    console.log("Product!!!!");
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

// const removeCart = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(id);
//     console.log(req.user);
//     await User.findByIdAndUpdate(req.user._id, { $pull: { cart: id } });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

const removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);

    // Update the user's cart by pulling the product ID from the cart array
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { cart: id } },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    console.log(user.cart);
    res.status(200).json({
      msg: "Product removed from cart successfully",
      userCart: user.cart,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getCart, pushCart, removeCartItem };
