const express = require("express");
const router = express.Router();
const upload = require("../../../middleware/multer");

const { fetchShops, productCreate, createShop } = require("./controllers");

router.get("/", fetchShops);

router.post("/:shopId/products", upload.single("image"), productCreate);

router.post("/", createShop);

module.exports = router;
