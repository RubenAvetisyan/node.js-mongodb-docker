'use strict';


// eslint-disable-next-line no-unused-vars
const express = require('express');

const app = require('./app');

const port = 3000;

app.listen(port, () => console.log('Server running on port 3000 ...'));

module.exports = app;
