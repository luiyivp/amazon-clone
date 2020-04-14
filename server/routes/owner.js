const router = require('express').Router();
const Owner = require('../models/Owner');

const upload = require('../middlewares/upload-photo');

// POST request - create a new category
router.post('/owners', upload.single('photo'), async (req, res) => {
  try {
    const owner = new Owner();

    owner.name = req.body.name;
    owner.about = req.body.owner;
    owner.photo = req.file.path;

    await owner.save();

    res.json({
      success: true,
      message: 'Successfuly created a new owner'
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
});

// GET request - get all products
router.get('/owners', async (req, res) => {
  try {
    let owners = await Owner.find();
    res.json({
      success: true,
      owners
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
});

// GET request - get a single product

// PUT request - Update a single product

// DELETE request - delete a single product

module.exports = router;
