const router = require('express').Router();
const path = require('path');

// GET request - get all products
router.get('/photos/:id', async (req, res) => {
  try {
    res.sendFile('/programming/amazon-clone/server/uploads/' + req.params.id);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
});

module.exports = router;
