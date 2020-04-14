const router = require('express').Router();
const Order = require('../models/Order');
const verifyToken = require('../middlewares/verify-token');

// GET request - get all products
router.get('/orders', verifyToken, async (req, res) => {
  try {
    let products = await Order.find({ owner: req.decoded._id })
      .deepPopulate('owner product.productID.owner')
      .exec();

    res.json({
      success: true,
      products
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
});
module.exports = router;
