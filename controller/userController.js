const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

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
    console.log("first");
    console.log(user);
    console.log(user.username);
    const users = user.username;
    const usertype = user.usertype;
    const token = createToken(user._id);
    res
      .status(200)
      .json({ msg: "Successfully Login!!", id, email, users, usertype, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//signup

const signup = async (req, res) => {
  const { email, password, username, usertype } = req.body;
  console.log("rahul !!!!!!!!!!!!!");
  console.log(req.body);
  try {
    const user = await User.signup(email, password, usertype, username);
    console.log(user);
    id = user._id;
    const token = createToken(user._id);
    res.status(200).json({
      msg: "Successfully Resister!!",
      id,
      username,
      usertype,
      email,
      token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUser = (req, res) => {
  try {
    const user = req.user;
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    console.log("Rahul Prajapati!!!!");
    console.log(user);
    res.status(200).json({
      email: user.email,
      id: user._id,
      username: user.username,
      usertype: user.usertype,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const loginToGoogle = async (req, res) => {
  const { token } = req.body; // The token sent from the frontend

  if (!token) {
    return res.status(400).json({ message: "Token is missing" });
  }
  const client = new OAuth2Client(
    "683761480123-r5au9p34ab6gdqpj8acgvvad363kbl4b.apps.googleusercontent.com"
  );

  // Verify the Google ID token using OAuth2Client
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience:
      "683761480123-r5au9p34ab6gdqpj8acgvvad363kbl4b.apps.googleusercontent.com", // Your Google OAuth 2.0 Client ID
  });

  const payload = ticket.getPayload(); // Get user info from the token
  const email = payload.email;
  const googleId = payload.sub; // This is the unique ID from Google
  const name = payload.name;

  let user = await User.findOne({ email: email });
  if (user) {
    const users = user.username;
    const usertype = user.usertype;
    const token = createToken(user._id);
    res.status(200).json({
      msg: "Successfully Login!!",
      id: user._id,
      email,
      users,
      usertype,
      token,
    });
  } else {
    user = await User.create({ email: email, username: name });

    id = user._id;
    const token = createToken(user._id);
    res.status(200).json({
      msg: "Successfully Resister!!",
      id,
      name,
      usertype: user.usertype,
      email,
      token,
    });
  }

  // console.log(payload);
};

module.exports = { login, signup, getUser, loginToGoogle };
