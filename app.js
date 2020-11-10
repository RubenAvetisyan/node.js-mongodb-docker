'use strict';

const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const passportStrategy = require('./middleware/passport-strategy');
const keys = require('./keys');
const app = express();

const dbOptions = {
  useNewUrlParser: true,
  createIndexes: true
};

mongoose
  .connect(keys.MONGO_URI, dbOptions)
  .then(() => console.log.bind(console, 'MongoDB Connected'))
  .catch(error => console.error.bind(
    console,
    'MongoDB connection error:',
    error));

app.use(compression());

app.use(passport.initialize());
passport.use(passportStrategy);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));


app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);

module.exports = app;
