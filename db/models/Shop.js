const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
const products = require("../../products");

const ShopSchema = new mongoose.Schema(
  {
    name: String,
    Image: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },

  { timestamps: true }
);
ShopSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = mongoose.model("Shop", ShopSchema);
