const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Product not found" });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, category, price, rating, img, desc, description, ingredients } = req.body;
    if (!name || !category || !price || !img) {
      return res.status(400).json({ message: "Name, category, price and image are required" });
    }
    const product = await Product.create({
      name, category, price,
      rating: rating || 4.5,
      img, desc, description,
      ingredients: ingredients || [],
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, category, price, rating, img, desc, description, ingredients } = req.body;
    product.name = name ?? product.name;
    product.category = category ?? product.category;
    product.price = price ?? product.price;
    product.rating = rating ?? product.rating;
    product.img = img ?? product.img;
    product.desc = desc ?? product.desc;
    product.description = description ?? product.description;
    product.ingredients = ingredients ?? product.ingredients;

    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };