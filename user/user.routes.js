const express = require("express");
const passport = require("passport");
const { fetchShops } = require("../apis/products/shops/controllers");
const { signUp, signIn } = require("./user.controllers");
const router = express.Router();

router.post("/signup", signUp);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signIn
);

module.exports = router;
