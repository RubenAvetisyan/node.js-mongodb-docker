'use strict';

const { model, Schema } = require('mongoose');

const productSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
  },
  created_by: {
    type: String, // #id of the user who created this product
  }
});

module.exports = model('products', productSchema);
