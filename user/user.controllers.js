const User = require("../db/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

exports.signUp = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;

    const newUser = await User.create(req.body);

    const payLoad = {
      _id: newUser._id,
      userName: newUser.userName,
    };

    const token = jwt.sign(payLoad, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
