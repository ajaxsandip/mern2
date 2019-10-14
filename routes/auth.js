const express = require('express');
const { check, validationResult } = require('express-validator/check');

const router = express.Router();

const bcrypt = require('bcryptjs');

const User = require('../models/User');

const jwt = require('jsonwebtoken');

const config = require('config');

const auth = require('../middleware/auth');

router.post(
  '/',
  [
    check('email', 'Please Enter Email').isEmail(),
    check('password', 'Please enter the Password')
      .not()
      .isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    User.findOne({ email }).then(user => {
      if (!user) {
        return res.status(400).json('Invalid Credentials');
      }
      bcrypt.hash(password, 12).then(match => {
        if (!match) {
          return res.status(400).json('Invalid Credentials');
        }
        const payload = {
          user: {
            id: user.id
          }
        };
        console.log('payload', payload);
        jwt.sign(
          payload,
          config.get('secret'),
          { expiresIn: 36000 },
          (err, token) => {
            if (err) {
              throw err;
            } else {
              return res.json(token);
            }
          }
        );
      });
    });
  }
);

router.get('/', auth, (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.json('server error');
    });
});
module.exports = router;
