const router = require('express').Router();
const Address = require('../models/Address');
const User = require('../models/User');
const verifyToken = require('../middlewares/verify-token');
const axios = require('axios');

// POST request - create a new category
router.post('/addresses', verifyToken, async (req, res) => {
  try {
    const address = new Address();

    address.user = req.decoded._id;
    address.country = req.body.country;
    address.fullName = req.body.fullName;
    address.streetAddress = req.body.streetAddress;
    address.city = req.body.city;
    address.state = req.body.state;
    address.zipCode = req.body.zipCode;
    address.phoneNumber = req.body.phoneNumber;
    address.deliverInstructions = req.body.deliverInstructions;
    address.securityCode = req.body.securityCode;

    await address.save();

    res.json({
      success: true,
      message: 'Succesfully added address'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET request - get a single product
router.get('/addresses', verifyToken, async (req, res) => {
  try {
    let addresses = await Address.find({ user: req.decoded._id });

    res.json({
      success: true,
      addresses
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.get('/countries', async (req, res) => {
  try {
    let response = await axios.get('http://restcountries.eu/rest/v2/all');

    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.get('/address/:id', verifyToken, async (req, res) => {
  try {
    let address = await Address.findOne({ _id: req.params.id });

    res.json({
      success: true,
      address
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.put('/address/:id', verifyToken, async (req, res) => {
  try {
    let foundAddress = await Address.findOne({ user: req.decoded._id, _id: req.params.id });

    if (req.body.country) foundAddress.country = req.body.country;
    if (req.body.fullName) foundAddress.fullName = req.body.fullName;
    if (req.body.streetAddress) foundAddress.streetAddress = req.body.streetAddress;
    if (req.body.city) foundAddress.city = req.body.city;
    if (req.body.state) foundAddress.state = req.body.state;
    if (req.body.zipCode) foundAddress.zipCode = req.body.zipCode;
    if (req.body.phoneNumber) foundAddress.phoneNumber = req.body.phoneNumber;
    if (req.body.deliverInstructions)
      foundAddress.deliverInstructions = req.body.deliverInstructions;
    if (req.body.securityCode) foundAddress.securityCode = req.body.securityCode;

    await foundAddress.save();

    res.json({
      success: true,
      message: 'Succesfully updated the address'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.delete('/address/:id', verifyToken, async (req, res) => {
  try {
    let deletedAddress = Address.remove({ user: req.decoded._id, _id: req.params.id });

    if (deletedAddress) {
      res.json({
        success: true,
        message: 'Succesfully deleted the address'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.put('/addresses/set/default', verifyToken, async (req, res) => {
  try {
    const updatedAddress = await User.findOneAndUpdate(
      { _id: req.decoded._id },
      { $set: { address: req.body.id } }
    );

    if (updatedAddress) {
      res.json({
        success: true,
        message: 'Succesfully set this address as default'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
