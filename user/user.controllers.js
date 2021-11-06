const User = require("../db/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

const generateToken = (user) => {
  const payLoad = {
    _id: user._id,
    username: user.username,
  };

  const token = jwt.sign(payLoad, JWT_SECRET, { expiresIn: "1h" });
  return token;
};

exports.signUp = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;

    const newUser = await User.create(req.body);

    const token = generateToken(newUser);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  const token = generateToken(req.user);
  res.json({ token });
};
