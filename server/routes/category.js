const router = require('express').Router();
const Category = require('../models/Category');

// POST request - create a new category
router.post('/categories', async (req, res) => {
  try {
    const category = new Category();
    category.type = req.body.type;

    await category.save();
    res.json({
      success: true,
      message: 'Successfuly created a new category',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET request - get all products
router.get('/categories', async (req, res) => {
  try {
    let categories = await Category.find();
    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

// GET request - get a single product

// PUT request - Update a single product

// DELETE request - delete a single product

module.exports = router;
