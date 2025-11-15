const express = require('express');
const router = express.Router();
const Product = require('../database/models/Product');

// CREATE product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, image, stock, type_id } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      image,
      stock,
      type_id,
    });

    return res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error creating product',
      error: error.message,
    });
  }
});

// READ all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.json(products);
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching products',
      error: error.message,
    });
  }
});

// READ product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json(product);
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching product',
      error: error.message,
    });
  }
});

// UPDATE product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.update(req.body);

    return res.json({
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error updating product',
      error: error.message,
    });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();

    return res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return res.status(400).json({
      message: 'Error deleting product',
      error: error.message,
    });
  }
});

module.exports = router;
