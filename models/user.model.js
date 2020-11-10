'use strict';

const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'client'],
    required: true
  }
});

// Compile model from schema
module.exports = model('users', userSchema);
