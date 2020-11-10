'use strict';

const { Strategy, ExtractJwt } = require('passport-jwt');
// const { model } = require('mongoose');
const keys = require('../keys');
const User = require('../models/user.model'); // model('users');

// Authorization: Bearer ****
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.JWT
};


module.exports = new Strategy(options, async (payload, done) => {
  try {
    const candidate = await User.findById(payload.userId);
    if (candidate) {
      return done(null, candidate);
    } else {
      return done(null, false);
    }
  } catch (error) {
    console.error(error);
  }
});
