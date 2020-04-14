const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

const User = require('./models/User');

dotenv.config();

const app = express();

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to the database');
  }
});

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const ownerRoutes = require('./routes/owner');
const photoRoutes = require('./routes/photo');
const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/review');
const addressRoutes = require('./routes/address');
const paymentRoutes = require('./routes/payment');
const orderRoutes = require('./routes/order');

app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', ownerRoutes);
app.use('/api', photoRoutes);
app.use('/api', authRoutes);
app.use('/api', reviewRoutes);
app.use('/api', addressRoutes);
app.use('/api', paymentRoutes);
app.use('/api', orderRoutes);

// this folders for this application will be used to store public file images
app.use('/uploads', express.static(path.resolve('uploads')));

app.listen(3000, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Listen on PORT', 3000);
  }
});
