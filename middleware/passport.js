const LocalStrategy = require("passport-local").Strategy;
const User = require("../db/models/User");
const bcrypt = require("bcrypt");
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const { JWT_SECRET } = require("../config/keys");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  console.log(username); //passport takes the req.body as "username and passowrd"
  console.log(password);
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      //validating password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return done(null, user);
      } else {
        return done(null, error);
      }
    } else {
      return done(null, false); //throws a 401 error
    }
    // const passwordMatch = user            // shorter version using ternanry operator
    // ? await bcrypt.compare(password, user.password)
    // : false

    // if(passwordMatch) return done(null, user)

    // return done(null, false)
  } catch (error) {
    return done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  { jwtFromRequest: fromAuthHeaderAsBearerToken(), secretOrKey: JWT_SECRET },
  async (payLoad, done) => {
    if (Date.now() > payLoad.exp) {
      return done(null, false);
    }
    try {
      const user = await User.findById(payLoad._id);
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
