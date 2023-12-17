const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, password, userType } = req.body;
    // console.log(username, password, userType);
    const user = new User({ username, password, userType });

    const userData = await user.save();
    // console.log(userData);
    res.json({ message: "User registered successfully" });
  } catch (error) {
    // console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Error during user creation" });
    }
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByCredentials(username, password);

    if (!user) {
      return res.status(401).json({ error: "Invalid login credentials" });
    }

    const token = await user.generateAuthToken();

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error during login" });
  }
};
