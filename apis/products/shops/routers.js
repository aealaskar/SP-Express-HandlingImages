const express = require("express");
const router = express.Router();
const { fetchShops, productCreate, createShop } = require("./controllers");

router.get("/", fetchShops);

router.post("/:shopId/products", productCreate);

router.post("/", createShop);

module.exports = router;
