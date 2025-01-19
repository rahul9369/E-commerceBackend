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
    id = user._id;
    const token = createToken(user._id);
    res.status(200).json({ msg: "Successfully Login!!", id, email, token });
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
    id = user._id;
    const token = createToken(user._id);
    res
      .status(200)
      .json({ msg: "Successfully Resister!!", id, username, email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUser = (req, res) => {
  try {
    const user = req.user;
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];

    res.status(200).json({ email: user.email, token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { login, signup, getUser };
