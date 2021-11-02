const express = require("express");
const router = express.Router();
const {
  fetchCategories,
  createCategory,
  productCreate,
} = require("./controllers");

router.get("/", fetchCategories);

router.post("/:categoryId/products", productCreate);

router.post("/", createCategory);

module.exports = router;
