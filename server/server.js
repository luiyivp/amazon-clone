const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Listen on PORT', 3000);
  }
});
