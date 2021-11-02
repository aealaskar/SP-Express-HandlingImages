const Category = require("../../../db/models/Category");
const Product = require("../../../db/models/Product");

exports.fetchCategories = async (req, res) => {
  try {
    const category = await Category.find().populate("products");
    return res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.productCreate = async (req, res) => {
  try {
    // if (req.file) {
    //   req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    // }
    // const newProduct = await Product.create(req.body);
    // return res.status(201).json(newProduct);
    const categoryId = req.params.categoryId;
    req.body = { ...req.body, category: categoryId };
    const newProduct = await Product.create(req.body);
    await Category.findOneAndUpdate(
      { _id: req.params.categoryId },
      { $push: { products: newProduct._id } }
    );
    return res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
