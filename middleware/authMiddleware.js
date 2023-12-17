const User = require("../models/User");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    // console.log(token);
    // add your secret key for more secure authentication
    const decoded = jwt.verify(token, "secret_key");
    const user = await User.findOne({
      _id: decoded._id,
    });

    if (!user) {
      throw new Error();
    }
    // console.log(user);
    // add a token in the request
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
