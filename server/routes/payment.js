const router = require('express').Router();
const moment = require('moment');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const verifyToken = require('../middlewares/verify-token');
const Order = require('../models/Order');

const SHIPMENT = {
  normal: {
    price: 13.98,
    days: 7
  },
  fast: {
    price: 49.98,
    days: 3
  }
};

function shipmentPrice(shipmentOption) {
  let estimated = moment().add(shipmentOption.days, 'd').format('dddd MMMM Do');

  return { estimated, price: shipmentOption.price };
}

router.post('/shipment', (req, res) => {
  let shipment;
  if (req.body.shipment === 'normal') {
    shipment = shipmentPrice(SHIPMENT.normal);
  } else {
    shipment = shipmentPrice(SHIPMENT.fast);
  }
  res.json({
    success: true,
    shipment
  });
});

router.post('/payment', verifyToken, (req, res) => {
  let totalPrice = Math.round(req.body.totalPrice * 100);
  stripe.customers
    .create({
      email: req.decoded.email
    })
    .then(customer => {
      return stripe.customers.createSource(customer.id, {
        source: 'tok_visa'
      });
    })
    .then(source => {
      return stripe.charges.create({
        amount: totalPrice,
        currency: 'usd',
        customer: source.customer
      });
    })
    .then(async change => {
      let order = new Order();
      let cart = req.body.cart;

      cart.map(product => {
        order.product.push({
          productID: product._id,
          quantity: parseInt(product.quantity),
          price: product.price
        });
      });

      order.owner = req.decoded._id;
      order.estimatedDelivery = req.body.estimatedDelivery;
      await order.save();

      res.json({
        success: true,
        message: 'Successfully made a payment'
      });
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
});

module.exports = router;
