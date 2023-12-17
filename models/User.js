const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
    validate: {
      validator: (value) => {
        return !value.toLowerCase().includes("password");
      },
      message: 'Password cannot contain "password"',
    },
  },
  userType: {
    type: String,
    required: true,
    enum: ["buyer", "seller"],
  },
});

// This method finds a user by their username and password
userSchema.statics.findByCredentials = async function (username, password) {
  const User = this;

  // Find the user by username
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("Invalid login credentials");
  }

  // Check if the provided password matches the stored hashed password
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Invalid login credentials");
  }

  return user;
};

userSchema.methods.generateAuthToken = function () {
  const user = this;
  // add your secret key for more secure authentication
  const token = jwt.sign({ _id: user._id.toString() }, "secret_key");
  return token;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
