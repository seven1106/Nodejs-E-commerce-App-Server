const express = require("express");
const { Product } = require("../models/product");

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

exports.fetchProductsCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.query.category });
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
exports.searchProducts = async (req, res) => {
  try {
    const products = await Product.find({
      name: { $regex: req.params.name, $options: "i" },
    });

    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
exports.rateProduct = async (req, res) => {
  try {
    const { id, rating, comment } = req.body;
    let product = await Product.findById(id);

    for (let i = 0; i < product.ratings.length; i++) {
      if (product.ratings[i].userId == req.user) {
        product.ratings.splice(i, 1);
        break;
      }
    }

    const ratingSchema = {
      userId: req.user,
      rating,
      comment,
    };

    product.ratings.push(ratingSchema);
    product = await product.save();
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
exports.fetchDeals = async (req, res) => {
  try {
    let products = await Product.find({});
    
    const calculateTotalRating = (product) => {
      return product.ratings.reduce((sum, rating) => sum + rating.rating, 0);
    };

    products.sort((a, b) => {
      let aSum = calculateTotalRating(a);
      let bSum = calculateTotalRating(b);
      return bSum - aSum;
    });

    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
exports.fetchAllProduct = async (req, res) => {
  try {
    let products = await Product.find({});
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
exports.fetchAllProduct = async (req, res) => {
  try {
    let products = await Product.find({});
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
exports.fetchBestSellerProducts = async (req, res) => {
  try {
    let products = await Product.find({}).sort({ sellCount: -1 });

    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
exports.fetchTopDeals = async (req, res) => {
  try {
    let products = await Product.aggregate([
      {
        $addFields: {
          discountAmount: { $subtract: ["$price", "$discountPrice"] }
        }
      },
      { 
        $sort: { discountAmount: -1 }
      },
      { 
        $limit: 10
      }
    ]);

    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


