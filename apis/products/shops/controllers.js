const Category = require("../../../db/models/Shop");
const Product = require("../../../db/models/Product");
const Shop = require("../../../db/models/Shop");

exports.fetchShops = async (req, res) => {
  try {
    const shop = await Shop.find().populate("products");
    return res.json(shop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createShop = async (req, res) => {
  try {
    const newShop = await Shop.create(req.body);
    res.status(201).json(newShop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.productCreate = async (req, res) => {
  try {
    console.log(req.body);
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const shopId = req.params.shopId;
    req.body = { ...req.body, shop: shopId };
    const newProduct = await Product.create(req.body);
    await Shop.findOneAndUpdate(
      { _id: req.params.shopId },
      { $push: { products: newProduct._id } }
    );
    return res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
