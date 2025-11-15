// server/routes/typeProduct.routes.js
const express = require('express');
const router = express.Router();
const TypeProduct = require('../database/models/TypeProduct');

// CREATE TypeProduct
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newType = await TypeProduct.create({ name });

    return res.status(201).json({
      message: 'TypeProduct created successfully',
      type: newType
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'TypeProduct name must be unique' });
    }
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.errors.map(e => e.message) });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
});

// READ all TypeProducts
router.get('/', async (req, res) => {
  try {
    const types = await TypeProduct.findAll();
    return res.json(types);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// READ TypeProduct by ID
router.get('/:id', async (req, res) => {
  try {
    const type = await TypeProduct.findByPk(req.params.id);

    if (!type) {
      return res.status(404).json({ error: 'TypeProduct not found' });
    }

    return res.json(type);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// UPDATE TypeProduct
router.put('/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const type = await TypeProduct.findByPk(req.params.id);

    if (!type) {
      return res.status(404).json({ error: 'TypeProduct not found' });
    }

    if (name) type.name = name;

    await type.save();

    return res.json({
      message: 'TypeProduct updated successfully',
      type
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'TypeProduct name must be unique' });
    }
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.errors.map(e => e.message) });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE TypeProduct
router.delete('/:id', async (req, res) => {
  try {
    const type = await TypeProduct.findByPk(req.params.id);

    if (!type) {
      return res.status(404).json({ error: 'TypeProduct not found' });
    }

    await type.destroy();

    return res.json({ message: 'TypeProduct deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
