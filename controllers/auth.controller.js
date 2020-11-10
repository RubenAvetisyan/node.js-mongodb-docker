'use strict';

const { Types } = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const keys = require('../keys');
const User = require('../models/user.model');

module.exports.login = async (req, res) => {

  const candidate = await User.findOne({ username: req.body.username });

  if (candidate) {
    const isPasswordCorrect =
          bcrypt.compareSync(req.body.password, candidate.password);

    if (isPasswordCorrect) {
      const token = jwt.sign({
        username: candidate.username,
        userId: candidate._id,
        role: candidate.role
      }, keys.JWT, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'wrong user credentials' });
    }
  } else {
    res.status(404).json({ message: 'user not found' });
  }
};

module.exports.createUser = async (req, res) => {

  const candidate = await User.findOne({ username: req.body.username });

  if (candidate) {
    res.status(409).json({ message: 'this username is used by another user' });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const { username, name, lastname, age, role } = req.body;
    const password = bcrypt.hashSync(req.body.password, salt);
    const _id = Types.ObjectId();

    try {
      const user = new User({
        _id,
        username,
        password,
        name,
        lastname,
        age,
        role
      });
      await user.save();

      res.status(201).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
};
