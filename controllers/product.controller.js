'use strict';

const { Types } = require('mongoose');
const Product = require('../models/product.model');


module.exports.create = async (req, res) => {

  const {
    _id = Types.ObjectId(),
    name,
    price = 0,
    created_by = req.user._id,
    description
  } = req.body;

  const product = new Product({ _id, name, price, created_by, description });

  try {
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getAll = async (req, res) => {

  const selectOptions =
    req.user.role === 'admin' ? 'name created_by' : 'name';

  try {
    const product = await Product.find().select(selectOptions).exec();
    res.json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getById = async (req, res) => {
  const selectOptions =
    req.user.role === 'admin' ? '' : '-created_by';
  try {
    await (await Product.findById(req.params.id).select(selectOptions))
      .execPopulate((error, product) => {
        res.json(product);
      }); // TODO
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.update = async (req, res) => {
  const $set = {
    description: req.body.description
  };
  try {
    const product = await Product.findOneAndUpdate({
      _id: req.params.id
    }, { $set }, { new: true });

    res.json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.remove = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: 'product has been deleted' });
  } catch (error) {
    res.status(500).json(error);
  }
};
