const express = require('express');

const { check, validationResult } = require('express-validator/check');

const router = express.Router();

const bcrypt = require('bcryptjs');

const User = require('../models/User');

const jwt = require('jsonwebtoken');

const config = require('config');

router.post(
  '/',
  [
    check('name', 'Please enter Name')
      .not()
      .isEmpty(),
    check('email', 'Please Enter Email').isEmail(),
    check('password', 'Please enter the Password')
      .not()
      .isEmpty()
  ],
  (req, res) => {
    // res.send(req.body)ff;

    const errors = validationResult(req);
    let theuser = {};
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    User.findOne({ email })
      .then(user => {
        if (user) {
          return res.status(400).json({ msg: 'User ALready Exists' });
        }
        return bcrypt.hash(password, 12);
      })
      .then(hashedpassword => {
        if (hashedpassword === undefined) {
          console.log('undefined1');
          return '';
          //   return res.status(400).json({ msg: 'User ALready Exists' });
        } else {
          console.log(hashedpassword);
          const user1 = new User({
            name: name,
            email: email,
            password: hashedpassword
          });
          user1.save();
          const payload = {
            user: {
              id: user1.id
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
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
);

router.get('/', (req, res) => {
  res.send('User Retrievedd');
});
module.exports = router;
