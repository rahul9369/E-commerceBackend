const express = require("express");
const router = express.Router();
const { getCart, pushCart } = require("../controller/cartController");
const requireAuth = require("../Middleware/authmiddleware");

router.get("/user/:userid/cart", getCart);

router.post("/user/:itemid/cart", requireAuth, pushCart);

module.exports = router;
