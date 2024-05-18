const express = require("express");
const { Product } = require("../models/product");


exports.fetchProductsCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.query.category });
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
// exports.searchProducts = async (req, res) => {
//   try {
//     const products = await Product.find({
//       name: { $regex: req.params.name, $options: "i" },
//     });

//     res.json(products);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// };
