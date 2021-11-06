const Category = require("../../../db/models/Shop");
const Product = require("../../../db/models/Product");
const Shop = require("../../../db/models/Shop");

exports.fetchShops = async (shopId, next) => {
  try {
    const shop = await Shop.findById(shopId);
    return shop;
  } catch (error) {
    next(error);
  }
};

exports.createShop = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.owner = req.user._id;
    const newShop = await Shop.create(req.body);
    await newShop.populate({ path: "owner", select: "username" });
    res.status(201).json(newShop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.productCreate = async (req, res, next) => {
  try {
    console.log(req.user._id);
    console.log(req.shop.owner._id);
    if (!req.user._id.equals(req.shop.owner._id)) {
      return next({ status: 401, message: "You're not the owner" });
    }
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.shop = req.params.shopId;

    const newProduct = await Product.create(req.body);
    await Shop.findByIdAndUpdate(req.shop, {
      $push: { products: newProduct._id },
    });
    return res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
