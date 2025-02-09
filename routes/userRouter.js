const express = require("express");
const router = express.Router();
const requireAuth = require("../Middleware/authmiddleware");
const {
  login,
  signup,
  getUser,
  loginToGoogle,
} = require("../controller/userController");

router.post("/login", login);
router.post("/signup", signup);
router.post("/getUser", requireAuth, getUser);

router.post("/callbackGoogle", loginToGoogle);

module.exports = router;
