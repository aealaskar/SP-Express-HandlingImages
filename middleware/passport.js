const LocalStrategy = require("passport-local").Strategy;
const User = require("../db/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  console.log(username);
  console.log(password);

  try {
    const user = await User.findOne({ username: username });
    if (user) {
      bcrypt.compare();
    } else {
      done(null, false);
    }
  } catch (error) {}
});
