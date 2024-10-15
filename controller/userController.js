const User = require("../models/user");
const jwt = require("jsonwebtoken");

//token fuction

const createToken = (id) => {
  return jwt.sign({ id }, "dnsjndjedcwe", { expiresIn: "1d" });
};

//login

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    // create
    const token = createToken(user._id);
    res.status(200).json({ msg: "Successfully Login!!", email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//signup

const signup = async (req, res) => {
  const { email, password, username } = req.body;
  console.log(req.body);
  try {
    const user = await User.signup(email, password, username);
    console.log(user);
    const token = createToken(user._id);
    res.status(200).json({ msg: "Successfully Resister!!", email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { login, signup };
