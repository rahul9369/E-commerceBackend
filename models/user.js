const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const fs = require("fs");
const nodemailer = require("nodemailer");
const Product = require("./product");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  usertype: {
    type: String,
    required: true,
    default: "consumer",
    enum: ["consumer", "seller"],
  },

  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product12",
    },
  ],
});

// Load the HTML template once
const htmlTemplate = fs.readFileSync("htmlTamplates/newSignup.html", "utf-8");
function replacePlaceholder(template, username) {
  return template.replace("{{username}}", username);
}

// Static Signup Method
userSchema.statics.signup = async function (
  email,
  password,
  usertype,
  username
) {
  // Validation
  if (!email || !password || !username || !usertype) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const exist = await this.findOne({ email });
  if (exist) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash, usertype, username });
  return user;
};

// Static Login Method
userSchema.statics.login = async function (email, password) {
  // Validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

// Pre-save Hook for Sending Email
userSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      // Nodemailer transporter using environment variables
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
          user: "rp25082003@gmail.com", // Environment variable for email user
          pass: "yevs nagt pfvd rqfq", // Environment variable for email password
        },
      });

      const username = this.username; // Ensure this.username is properly accessed
      console.log("Username being passed:", username); // Debugging: Log username

      const replacedHtml = replacePlaceholder(htmlTemplate, username);

      await transporter.sendMail({
        from: '"Ecommerce website" rp25082003@gmail.com', // Change sender info as needed
        to: this.email,
        subject: "Welcome to Your Website",
        html: replacedHtml, // Send the HTML email with the username replaced
      });

      next(); // Call next only after email is sent successfully
    } catch (err) {
      next(err); // Pass error to next middleware if sending fails
    }
  } else {
    next(); // If not new, just proceed
  }
});

module.exports = mongoose.model("User", userSchema);
