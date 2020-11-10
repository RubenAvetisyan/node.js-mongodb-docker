'use strict';

const passport = require('passport');
const { Router } = require('express');
const ctr = require('../controllers/product.controller');
const router = Router();

// const ROLE = {
//   ADMIN: 'admin',
//   CLIENT: 'client'
// };

function rolePermission(...permissions) {
  return (req, res, next) => {
    if (permissions.some(role => req.user.role === role)) {
      next();
    } else {
      return res.status(401).json({ message: 'wrong user' });
    }
  };
}

// Admin
// /api/product

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  rolePermission('admin'),
  ctr.create
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  ctr.getAll
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  ctr.getById
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  rolePermission('admin'),
  ctr.update
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  rolePermission('admin'),
  ctr.remove
);

module.exports = router;
