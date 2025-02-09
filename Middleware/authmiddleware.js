const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireAuth = async (req, res, next) => {
  //verify authorization
  const { authorization } = req.headers;
  // console.log("Rahul Prajapati");
  // console.log(req.headers);

  //console.log(authorization);

  if (!authorization) {
    return res.status(400).json({ error: "Authorization token required" });
  }
  const token = authorization?.split(" ")[1];
  // console.log(token);
  try {
    const { id } = jwt.verify(token, "dnsjndjedcwe");
    //console.log(id);
    //find user
    req.user = await User.findOne({ _id: id });
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "request is not authorized" });
  }
};

module.exports = requireAuth;
