const express = require("express");
const passport = require("passport");
const router = express.Router();
const upload = require("../../../middleware/multer");

const { fetchShops, productCreate, createShop } = require("./controllers");

//middleware
router.param("shopId", async (req, res, next, shopId) => {
  const shop = await fetchShops(shopId, next);
  if (shop) {
    req.shop = shop;
    next();
  } else {
    next({ status: 404, message: "Shop not found!" });
  }
});

router.get("/", fetchShops);

router.post(
  "/:shopId/products",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  productCreate
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createShop
);

module.exports = router;
