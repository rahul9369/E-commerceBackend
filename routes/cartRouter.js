const express = require("express");
const router = express.Router();
const {
  getCart,
  pushCart,
  removeCartItem,
} = require("../controller/cartController");
const requireAuth = require("../Middleware/authmiddleware");

router.get("/user/cart", requireAuth, getCart);

router.post("/user/:itemid/cart", requireAuth, pushCart);

router.delete("/user/cart/:id", requireAuth, removeCartItem);

module.exports = router;
